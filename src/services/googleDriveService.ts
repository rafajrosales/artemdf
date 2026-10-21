/**
 * Google Drive API v3 Service for client-side image browsing
 * Uses Bearer token obtained via client-side OAuth flow
 */

export interface DriveImageFile {
  id: string;
  name: string;
  thumbnailLink?: string;
  webContentLink?: string;
  webViewLink?: string;
  size?: string;
}

/**
 * Extract folder ID from a Google Drive URL
 * Example: https://drive.google.com/drive/folders/1rmBzsIg_9_LHhlfsXHehCrmGh89A67PZ
 */
export function extractFolderIdFromUrl(url: string): string | null {
  if (!url) return null;
  const folderRegex = /(?:drive\.google\.com\/drive\/(?:u\/\d+\/)?folders\/)([a-zA-Z0-9_-]+)/;
  const match = url.trim().match(folderRegex);
  if (match && match[1]) {
    return match[1];
  }
  return null;
}

/**
 * Fetch image files from Google Drive (either from a specific folder or recent images)
 */
export async function fetchDriveImages(
  accessToken: string,
  folderId?: string | null,
  searchQuery?: string
): Promise<DriveImageFile[]> {
  try {
    let queryParts = ["trashed = false"];

    if (folderId) {
      queryParts.push(`'${folderId}' in parents`);
    } else {
      queryParts.push("mimeType contains 'image/'");
    }

    if (searchQuery && searchQuery.trim()) {
      const sanitized = searchQuery.replace(/'/g, "\\'");
      queryParts.push(`name contains '${sanitized}'`);
    }

    const q = encodeURIComponent(queryParts.join(' and '));
    const fields = encodeURIComponent('files(id,name,mimeType,thumbnailLink,webContentLink,webViewLink,size)');
    const url = `https://www.googleapis.com/drive/v3/files?q=${q}&fields=${fields}&pageSize=60&orderBy=createdTime desc`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      console.warn('Google Drive API error:', errData);
      throw new Error(errData?.error?.message || `Error ${response.status} de Google Drive`);
    }

    const data = await response.json();
    const files: DriveImageFile[] = (data.files || []).map((file: any) => ({
      id: file.id,
      name: file.name,
      thumbnailLink: file.thumbnailLink 
        ? file.thumbnailLink.replace(/=s\d+$/, '=s600') 
        : `https://lh3.googleusercontent.com/d/${file.id}`,
      webContentLink: file.webContentLink,
      webViewLink: file.webViewLink,
      size: file.size,
    }));

    return files;
  } catch (error: any) {
    console.error('Error fetching files from Google Drive:', error);
    throw error;
  }
}
