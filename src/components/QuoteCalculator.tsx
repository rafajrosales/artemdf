import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  MessageCircle, 
  Mail, 
  Upload, 
  CheckCircle, 
  Copy, 
  Check, 
  FileText,
  AlertCircle,
  MapPin
} from 'lucide-react';
import { GalleryItem } from '../data/galleryData';

interface QuoteCalculatorProps {
  selectedItem?: GalleryItem | null;
  onClearSelectedItem?: () => void;
}

export const QuoteCalculator: React.FC<QuoteCalculatorProps> = ({ 
  selectedItem, 
  onClearSelectedItem 
}) => {
  // Form State - Thickness is strictly 3 mm
  const [projectType, setProjectType] = useState<'altar' | 'lampara' | 'caja' | 'qr' | 'recuerdo' | 'mandala' | 'especial'>('altar');
  const [sizeScale, setSizeScale] = useState<'chico' | 'mediano' | 'grande' | 'maximo40'>('mediano');
  const [finish, setFinish] = useState<'natural' | 'tinte' | 'pintado'>('natural');
  const [includeLed, setIncludeLed] = useState(false);
  const [includeCustomEngraving, setIncludeCustomEngraving] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [customText, setCustomText] = useState('');

  // Delivery zone state (strictly local: Zona Norte CDMX or Tecámac +10%)
  const [deliveryZone, setDeliveryZone] = useState<'norte_cdmx' | 'tecamac'>('norte_cdmx');
  
  // Client details
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientCity, setClientCity] = useState('');
  const [clientNotes, setClientNotes] = useState('');

  // Uploaded mock file
  const [attachedFileName, setAttachedFileName] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Synchronize when a user clicks "Quiero cotizar este modelo" from gallery
  useEffect(() => {
    if (selectedItem) {
      if (selectedItem.category === 'Altares & Tradición') setProjectType('altar');
      else if (selectedItem.category === 'Lámparas & Luz') {
        setProjectType('lampara');
        setIncludeLed(true);
      } else if (selectedItem.category === 'Cajas & Bisagras') setProjectType('caja');
      else if (selectedItem.category === 'Comercial & QR') setProjectType('qr');
      else if (selectedItem.category === 'Navidad & Festivos' || selectedItem.category === 'Eventos & Sacro') setProjectType('recuerdo');
      else setProjectType('mandala');

      setCustomText(`Basado en: ${selectedItem.title}`);
    }
  }, [selectedItem]);

  // Calculate dynamic price strictly based on MDF 3mm & max 40 cm laser bed + 10% delivery surcharge for Tecámac
  const calculateEstimate = () => {
    let base = 210;
    if (projectType === 'altar') base = 340;
    if (projectType === 'lampara') base = 280;
    if (projectType === 'caja') base = 190;
    if (projectType === 'qr') base = 135;
    if (projectType === 'recuerdo') base = 80;
    if (projectType === 'mandala') base = 250;
    if (projectType === 'especial') base = 295;

    // Size multiplier strictly within 40 cm format
    let sizeMultiplier = 1;
    if (sizeScale === 'chico') sizeMultiplier = 0.75;
    if (sizeScale === 'mediano') sizeMultiplier = 1.0;
    if (sizeScale === 'grande') sizeMultiplier = 1.35;
    if (sizeScale === 'maximo40') sizeMultiplier = 1.65; // Max 40 cm

    // Finish
    let finishCost = 0;
    if (finish === 'tinte') finishCost = 50;
    if (finish === 'pintado') finishCost = 95;

    // Extras
    let extras = 0;
    if (includeLed) extras += 110;
    if (includeCustomEngraving) extras += 45;

    const unitPrice = Math.round((base * sizeMultiplier + finishCost + extras));
    
    // Volume discounts
    let discountPercent = 0;
    if (quantity >= 50) discountPercent = 0.25;
    else if (quantity >= 16) discountPercent = 0.18;
    else if (quantity >= 5) discountPercent = 0.10;

    const subtotal = unitPrice * quantity;
    const discountAmount = Math.round(subtotal * discountPercent);
    const subtotalAfterDiscount = subtotal - discountAmount;

    // Delivery surcharge: +10% extra for Los Héroes Tecámac and nearby zones
    const deliveryExtraPercent = deliveryZone === 'tecamac' ? 10 : 0;
    const deliveryExtraAmount = deliveryZone === 'tecamac' ? Math.round(subtotalAfterDiscount * 0.10) : 0;
    const total = subtotalAfterDiscount + deliveryExtraAmount;

    return {
      unitPrice,
      subtotal,
      discountPercent: discountPercent * 100,
      discountAmount,
      subtotalAfterDiscount,
      deliveryExtraPercent,
      deliveryExtraAmount,
      total
    };
  };

  const estimate = calculateEstimate();

  // Summary message text for WhatsApp or Email
  const getSummaryMessage = () => {
    const typeNames = {
      altar: 'Altar Tradicional / Día de Muertos',
      lampara: 'Lámpara o Luminaria con Luz LED',
      caja: 'Caja Curva con Bisagra Flexible (Kerf)',
      qr: 'Placa Comercial con Código QR',
      recuerdo: 'Recuerdos / Souvenirs para Evento',
      mandala: 'Cuadro Decorativo o Mandala 3D',
      especial: 'Proyecto Especial desde Boceto'
    };

    const sizeLabels = {
      chico: 'Chico (hasta 15 cm)',
      mediano: 'Mediano (15 a 25 cm)',
      grande: 'Grande (25 a 35 cm)',
      maximo40: 'Formato Máximo Láser (hasta 40 cm)'
    };

    const deliveryLabels = {
      norte_cdmx: 'Entrega personal a convenir en Zona Norte CDMX y zonas cercanas (sin recargo)',
      tecamac: 'Los Héroes Tecámac y alrededores (+10% extra por traslado)'
    };

    return `¡Hola ArteMDF! Me gustaría solicitar un presupuesto con las siguientes características:
    
- *Proyecto:* ${typeNames[projectType]}
${selectedItem ? `- *Modelo de Referencia:* ${selectedItem.title}` : ''}
- *Medidas:* ${sizeLabels[sizeScale]} (Área útil láser max 40 cm)
- *Espesor de Corte:* MDF 3 mm únicamente (estándar de taller)
- *Acabado:* ${finish === 'natural' ? 'Madera Natural Pulida' : finish === 'tinte' ? 'Tinte Nogal/Caoba' : 'Esmaltado a Color'}
- *Iluminación LED:* ${includeLed ? 'Sí, tira/foco LED cálido incluido' : 'No requerida'}
- *Grabado personalizado:* ${includeCustomEngraving ? (customText ? `"${customText}"` : 'Sí') : 'Sin grabado'}
- *Cantidad:* ${quantity} pieza(s)
- *Zona de Entrega:* ${deliveryLabels[deliveryZone]}
- *Total Estimado:* $${estimate.total} MXN${estimate.deliveryExtraAmount > 0 ? ` (incluye +10% traslado Tecámac: +$${estimate.deliveryExtraAmount} MXN)` : ''}${estimate.discountPercent > 0 ? ` (incluye ${estimate.discountPercent}% desc. volumen)` : ''}

*Datos del cliente:*
- *Nombre:* ${clientName || 'Por definir'}
- *Teléfono:* ${clientPhone || 'No proporcionado'}
- *Correo:* ${clientEmail || 'No proporcionado'}
- *Ciudad/Colonia:* ${clientCity || 'Por definir'}
${clientNotes ? `- *Notas adicionales:* ${clientNotes}` : ''}
${attachedFileName ? `- *Archivo de referencia:* ${attachedFileName}` : ''}

¿Podríamos coordinar los detalles de entrega? ¡Muchas gracias!`;
  };

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(getSummaryMessage());
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent(`Presupuesto ArteMDF (MDF 3mm · Entrega ${deliveryZone === 'tecamac' ? 'Tecámac' : 'Zona Norte CDMX'}) - ${clientName || 'Cliente'}`);
    const body = encodeURIComponent(getSummaryMessage());
    window.location.href = `mailto:rafajrosales@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getSummaryMessage());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSaveLocal = () => {
    const quoteRecord = {
      id: Date.now(),
      date: new Date().toLocaleDateString('es-MX'),
      projectType,
      total: estimate.total,
      quantity,
      thickness: '3 mm',
      deliveryZone,
      clientName: clientName || 'Presupuesto Guardado'
    };
    try {
      const prev = JSON.parse(localStorage.getItem('artemdf_quotes') || '[]');
      prev.unshift(quoteRecord);
      localStorage.setItem('artemdf_quotes', JSON.stringify(prev.slice(0, 5)));
    } catch (e) {
      // ignore
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachedFileName(e.target.files[0].name);
    }
  };

  return (
    <section id="cotizador" className="py-16 sm:py-24 bg-[#1B140E] border-b border-[#3D2C20]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E8AF50]">
            <Calculator className="w-3.5 h-3.5" />
            <span>Cotizador Interactivo · MDF 3 mm · Zona Norte & Tecámac</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#F7EFE6] text-balance">
            Calcula tu presupuesto personalizado
          </h2>
          <p className="text-xs sm:text-sm text-[#C7B5A6]">
            Configura tu pieza en <strong>MDF de 3 mm</strong> (hasta <strong>40 cm</strong>), selecciona tu zona de entrega y obtén el desglose exacto al instante.
          </p>
        </div>

        {/* 40cm, 3mm & Delivery Policy Notice Banner */}
        <div className="mb-6 sm:mb-8 p-3.5 sm:p-4 bg-[#261C14] border border-[#523B2A] rounded-xl flex items-start gap-3 text-xs text-[#D8B589]">
          <AlertCircle className="w-5 h-5 text-[#E09F3E] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-[#F7EFE6] block">
              Taller ArteMDF: MDF 3 mm · Cama 40x40 cm · Políticas de Entrega
            </span>
            <p className="text-[#BCAAA0] leading-relaxed text-[11px] sm:text-xs">
              • <strong>Zona Norte CDMX y zonas cercanas</strong>: Entregas personales a convenir en puntos acordados (sin costo extra).<br />
              • <strong>Los Héroes Tecámac y alrededores</strong>: Aplica un <strong>10% adicional</strong> por concepto de traslado.<br />
              • <strong>Entrega directa en mano</strong>: No realizamos envíos a otros estados de la República Mexicana para asegurar la calidad de cada pieza.
            </p>
          </div>
        </div>

        {/* Selected Item Notification Banner if imported from Gallery */}
        {selectedItem && (
          <div className="mb-6 sm:mb-8 p-3.5 sm:p-4 bg-[#2A1F16] border border-[#E09F3E]/40 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                referrerPolicy="no-referrer"
                className="w-12 h-12 object-cover rounded-lg border border-[#E09F3E]/40 shrink-0"
              />
              <div className="text-xs">
                <span className="text-[#E8AF50] font-semibold block">Cotizando modelo seleccionado:</span>
                <span className="text-white font-medium block text-xs sm:text-sm">{selectedItem.title}</span>
              </div>
            </div>

            <button
              onClick={onClearSelectedItem}
              className="text-xs text-[#BCAAA0] hover:text-white px-3 py-1.5 rounded-lg bg-[#1E1610] border border-[#3D2C20] hover:border-[#5C4533] transition-colors self-start sm:self-auto"
            >
              Cambiar modelo
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Configuration Form: 7 cols */}
          <div className="lg:col-span-7 bg-[#211812] border border-[#3D2C20] rounded-2xl p-4 sm:p-8 space-y-6 sm:space-y-8 shadow-xl">
            {/* Step 1: Tipo de Proyecto */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-[#F7EFE6] uppercase tracking-wider flex items-center justify-between">
                <span>1. Tipo de Proyecto o Pieza</span>
                <span className="text-[#9E8C7E] font-normal">Paso 1 de 4</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
                {[
                  { id: 'altar', label: 'Altar Tradicional', desc: '1 a 3 niveles (máx 40cm)' },
                  { id: 'lampara', label: 'Lámpara con Luz', desc: 'LED cálido y difusor' },
                  { id: 'caja', label: 'Caja Flexible Kerf', desc: 'Bisagra paramétrica' },
                  { id: 'qr', label: 'Placa Comercial QR', desc: 'Display de mostrador' },
                  { id: 'recuerdo', label: 'Recuerdos de Evento', desc: 'Bodas/Bautizos/Fiesta' },
                  { id: 'mandala', label: 'Mandala / Pared 3D', desc: 'Relieve multicapa' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setProjectType(item.id as any)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      projectType === item.id
                        ? 'bg-[#E09F3E]/20 border-[#E09F3E] text-white shadow-sm'
                        : 'bg-[#1A130D] border-[#36271C] text-[#C7B5A6] hover:border-[#4D382A] hover:text-white'
                    }`}
                  >
                    <span className="text-xs font-semibold block leading-tight">{item.label}</span>
                    <span className="text-[10px] text-[#9E8C7E] block mt-0.5">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Dimensiones (Capped at 40 cm) & Espesor 3 mm Únicamente */}
            <div className="space-y-4 pt-4 border-t border-[#33251B]">
              <label className="text-xs font-semibold text-[#F7EFE6] uppercase tracking-wider flex items-center justify-between">
                <span>2. Tamaño (Máximo 40 cm) & Grosor Exclusivo</span>
                <span className="text-[#9E8C7E] font-normal">Paso 2 de 4</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Scale */}
                <div className="space-y-1.5">
                  <span className="text-xs text-[#BCAAA0]">Dimensiones de la pieza:</span>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'chico', label: 'Chico (hasta 15cm)', sub: 'Recuerdos y placas' },
                      { id: 'mediano', label: 'Mediano (15 a 25cm)', sub: 'Lámparas y cajas' },
                      { id: 'grande', label: 'Grande (25 a 35cm)', sub: 'Portarretratos y nichos' },
                      { id: 'maximo40', label: 'Máx. 40cm (Límite)', sub: 'Área útil continua' },
                    ].map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSizeScale(s.id as any)}
                        className={`p-2.5 rounded-lg text-xs font-medium border text-left transition-colors ${
                          sizeScale === s.id
                            ? 'bg-[#E09F3E] text-[#17110C] font-semibold border-[#E09F3E]'
                            : 'bg-[#1A130D] border-[#36271C] text-[#C7B5A6] hover:text-white'
                        }`}
                      >
                        <span className="block font-semibold leading-tight">{s.label}</span>
                        <span className={`block text-[10px] mt-0.5 ${sizeScale === s.id ? 'text-[#3D2614]' : 'text-[#8F7D70]'}`}>
                          {s.sub}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Thickness Badge (Exclusively 3 mm) */}
                <div className="space-y-1.5">
                  <span className="text-xs text-[#BCAAA0]">Grosor de Corte Láser:</span>
                  <div className="p-3 bg-[#1A130D] border border-[#E09F3E]/40 rounded-xl flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#E09F3E]/20 text-[#E8AF50] font-bold text-sm flex items-center justify-center shrink-0 border border-[#E09F3E]/40 font-mono">
                      3 mm
                    </div>
                    <div className="text-xs space-y-0.5">
                      <span className="font-semibold text-[#F7EFE6] block">MDF 3 mm únicamente</span>
                      <span className="text-[11px] text-[#9E8C7E] block leading-relaxed">
                        Calibrado especial de alta densidad. El espesor óptimo para calado fino, bisagras curvas y ensambles mecánicos perfectos.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Acabados & Adicionales */}
            <div className="space-y-4 pt-4 border-t border-[#33251B]">
              <label className="text-xs font-semibold text-[#F7EFE6] uppercase tracking-wider flex items-center justify-between">
                <span>3. Acabado & Extras Especiales</span>
                <span className="text-[#9E8C7E] font-normal">Paso 3 de 4</span>
              </label>

              {/* Finish Options */}
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'natural', label: 'Madera Natural', note: 'Lijado suave listo para uso' },
                  { id: 'tinte', label: 'Tinte Nogal/Caoba', note: 'Vetas y tono cálido tostado' },
                  { id: 'pintado', label: 'Esmalte / Color', note: 'Negro mate, blanco o dorado' },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFinish(f.id as any)}
                    className={`p-2.5 rounded-lg text-left border transition-colors ${
                      finish === f.id
                        ? 'bg-[#E09F3E]/20 border-[#E09F3E] text-white'
                        : 'bg-[#1A130D] border-[#36271C] text-[#C7B5A6] hover:text-white'
                    }`}
                  >
                    <span className="text-xs font-semibold block">{f.label}</span>
                    <span className="text-[10px] text-[#9E8C7E] block mt-0.5">{f.note}</span>
                  </button>
                ))}
              </div>

              {/* Toggles */}
              <div className="space-y-2 pt-2">
                <label className="flex items-center justify-between p-3 bg-[#1A130D] border border-[#36271C] rounded-xl cursor-pointer hover:border-[#4D382A] transition-colors">
                  <div className="space-y-0.5">
                    <span className="text-xs font-semibold text-[#F7EFE6] block">
                      Incluir Iluminación LED Cálida (+ $110 MXN)
                    </span>
                    <span className="text-[11px] text-[#9E8C7E] block">
                      Tira o foco LED cálido con cable, interruptor y clavija para 110V.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={includeLed}
                    onChange={(e) => setIncludeLed(e.target.checked)}
                    className="w-4 h-4 accent-[#E09F3E] rounded cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3 bg-[#1A130D] border border-[#36271C] rounded-xl cursor-pointer hover:border-[#4D382A] transition-colors">
                  <div className="space-y-0.5">
                    <span className="text-xs font-semibold text-[#F7EFE6] block">
                      Pirograbado Láser Personalizado (+ $45 MXN)
                    </span>
                    <span className="text-[11px] text-[#9E8C7E] block">
                      Grabado milimétrico de nombres, fechas, logotipos o dedicatorias.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={includeCustomEngraving}
                    onChange={(e) => setIncludeCustomEngraving(e.target.checked)}
                    className="w-4 h-4 accent-[#E09F3E] rounded cursor-pointer"
                  />
                </label>

                {includeCustomEngraving && (
                  <div className="pt-1">
                    <input
                      type="text"
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      placeholder="Texto o frase a grabar (ej: 'Familia Ramírez', 'Recuerdo XV Años')"
                      className="w-full px-3.5 py-2 bg-[#17110C] border border-[#3D2C20] focus:border-[#E09F3E] rounded-lg text-xs text-[#F7EFE6] placeholder-[#8F7D70] focus:outline-none"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Step 4: Cantidad, Mayoreo & Modalidad de Entrega */}
            <div className="space-y-4 pt-4 border-t border-[#33251B]">
              <label className="text-xs font-semibold text-[#F7EFE6] uppercase tracking-wider flex items-center justify-between">
                <span>4. Cantidad & Zona de Entrega</span>
                <span className="text-[#9E8C7E] font-normal">Paso 4 de 4</span>
              </label>

              {/* Quantity */}
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-[#1A130D] border border-[#36271C] rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 flex items-center justify-center text-[#C7B5A6] hover:text-white rounded hover:bg-[#281D15] font-bold"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 bg-transparent text-center font-display font-bold text-base text-[#F7EFE6] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 flex items-center justify-center text-[#C7B5A6] hover:text-white rounded hover:bg-[#281D15] font-bold"
                  >
                    +
                  </button>
                </div>

                <div className="flex-1 text-xs text-[#BCAAA0]">
                  {quantity >= 50 ? (
                    <span className="text-[#E8AF50] font-semibold">
                      ¡25% de descuento por mayoreo aplicado!
                    </span>
                  ) : quantity >= 16 ? (
                    <span className="text-[#E8AF50] font-semibold">
                      ¡18% de descuento por volumen mediano aplicado!
                    </span>
                  ) : quantity >= 5 ? (
                    <span className="text-[#E8AF50] font-semibold">
                      ¡10% de descuento por paquete pequeño aplicado!
                    </span>
                  ) : (
                    <span>Precios con descuento a partir de 5 piezas para eventos o restaurantes.</span>
                  )}
                </div>
              </div>

              {/* Delivery Zone Selector */}
              <div className="space-y-2 pt-2">
                <span className="text-xs text-[#BCAAA0] block font-medium">
                  Selecciona tu Zona o Método de Entrega:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryZone('norte_cdmx')}
                    className={`p-3.5 rounded-xl text-left border transition-all ${
                      deliveryZone === 'norte_cdmx'
                        ? 'bg-[#E09F3E]/20 border-[#E09F3E] text-white shadow-sm ring-1 ring-[#E09F3E]'
                        : 'bg-[#1A130D] border-[#36271C] text-[#C7B5A6] hover:border-[#4D382A]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#F7EFE6]">
                      <MapPin className="w-3.5 h-3.5 text-[#E09F3E]" />
                      <span>Zona Norte CDMX & Cercanas</span>
                    </div>
                    <span className="text-[11px] text-[#D8B589] block mt-1">
                      A convenir (Punto de encuentro acordado)
                    </span>
                    <span className="text-[10px] text-emerald-400 font-medium block">
                      Sin recargo adicional
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryZone('tecamac')}
                    className={`p-3.5 rounded-xl text-left border transition-all ${
                      deliveryZone === 'tecamac'
                        ? 'bg-[#E09F3E]/20 border-[#E09F3E] text-white shadow-sm ring-1 ring-[#E09F3E]'
                        : 'bg-[#1A130D] border-[#36271C] text-[#C7B5A6] hover:border-[#4D382A]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#F7EFE6]">
                      <MapPin className="w-3.5 h-3.5 text-[#E8AF50]" />
                      <span>Los Héroes Tecámac & Alrededores</span>
                    </div>
                    <span className="text-[11px] text-[#E8AF50] font-semibold block mt-1">
                      +10% extra por traslado
                    </span>
                    <span className="text-[10px] text-[#8F7D70] block">
                      Zonas conurbadas de entrega
                    </span>
                  </button>
                </div>
              </div>

              {/* File Attachment Dropzone Simulation */}
              <div className="pt-2">
                <span className="text-xs text-[#BCAAA0] block mb-1.5">
                  ¿Tienes un boceto o logotipo para tu pieza? (Opcional):
                </span>
                <label className="flex items-center justify-center gap-2 p-3 border border-dashed border-[#4D382A] hover:border-[#E09F3E]/70 rounded-xl cursor-pointer bg-[#1A130D] hover:bg-[#241B13] transition-colors">
                  <Upload className="w-4 h-4 text-[#E09F3E]" />
                  <span className="text-xs text-[#C7B5A6] truncate">
                    {attachedFileName ? `Archivo adjunto: ${attachedFileName}` : 'Subir archivo de referencia (.jpg, .png, .dxf, .svg)'}
                  </span>
                  <input
                    type="file"
                    accept="image/*,.dxf,.svg,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Client Contact Fields */}
            <div className="pt-4 border-t border-[#33251B] space-y-3">
              <span className="text-xs font-semibold text-[#F7EFE6] uppercase tracking-wider block">
                Datos de Contacto para Coordinar tu Entrega
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Tu Nombre completo *"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="px-3.5 py-2.5 bg-[#17110C] border border-[#3D2C20] focus:border-[#E09F3E] rounded-lg text-xs text-[#F7EFE6] placeholder-[#8F7D70] focus:outline-none"
                />
                <input
                  type="tel"
                  placeholder="Teléfono / WhatsApp *"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="px-3.5 py-2.5 bg-[#17110C] border border-[#3D2C20] focus:border-[#E09F3E] rounded-lg text-xs text-[#F7EFE6] placeholder-[#8F7D70] focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Correo electrónico *"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="px-3.5 py-2.5 bg-[#17110C] border border-[#3D2C20] focus:border-[#E09F3E] rounded-lg text-xs text-[#F7EFE6] placeholder-[#8F7D70] focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Colonia / Estación / Punto de entrega *"
                  value={clientCity}
                  onChange={(e) => setClientCity(e.target.value)}
                  className="px-3.5 py-2.5 bg-[#17110C] border border-[#3D2C20] focus:border-[#E09F3E] rounded-lg text-xs text-[#F7EFE6] placeholder-[#8F7D70] focus:outline-none"
                />
              </div>

              <textarea
                placeholder="Punto de encuentro deseado (Zona Norte CDMX o Los Héroes Tecámac), fecha o notas..."
                rows={2}
                value={clientNotes}
                onChange={(e) => setClientNotes(e.target.value)}
                className="w-full px-3.5 py-2 bg-[#17110C] border border-[#3D2C20] focus:border-[#E09F3E] rounded-lg text-xs text-[#F7EFE6] placeholder-[#8F7D70] focus:outline-none resize-none"
              />
            </div>
          </div>

          {/* Sticky Price Summary & Actions: 5 cols */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <div className="bg-[#211812] border border-[#3D2C20] rounded-2xl p-6 sm:p-7 shadow-2xl space-y-6">
              <div className="space-y-1">
                <span className="text-xs text-[#E8AF50] font-semibold uppercase tracking-wider block">
                  Resumen del Presupuesto
                </span>
                <h3 className="font-display text-xl font-bold text-[#F7EFE6]">
                  Desglose Estimado · MDF 3 mm
                </h3>
              </div>

              {/* Breakdown lines */}
              <div className="space-y-2.5 text-xs text-[#C7B5A6] border-t border-b border-[#33251B] py-4">
                <div className="flex items-center justify-between">
                  <span className="text-[#9E8C7E]">Material y espesor:</span>
                  <span className="font-semibold text-[#F7EFE6]">
                    MDF 3 mm únicamente
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#9E8C7E]">Precio unitario estimado:</span>
                  <span className="font-mono text-[#F7EFE6] font-semibold tabular-nums">
                    ${estimate.unitPrice} MXN
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#9E8C7E]">Cantidad:</span>
                  <span className="font-mono text-[#F7EFE6] font-semibold tabular-nums">
                    {quantity} {quantity === 1 ? 'pieza' : 'piezas'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#9E8C7E]">Subtotal piezas:</span>
                  <span className="font-mono text-[#C7B5A6] tabular-nums">
                    ${estimate.subtotal} MXN
                  </span>
                </div>

                {estimate.discountAmount > 0 && (
                  <div className="flex items-center justify-between text-emerald-400">
                    <span>Descuento mayoreo ({estimate.discountPercent}%):</span>
                    <span className="font-mono font-semibold tabular-nums">
                      - ${estimate.discountAmount} MXN
                    </span>
                  </div>
                )}

                {/* Delivery Zone Line */}
                <div className="flex items-center justify-between pt-1 border-t border-[#33251B]">
                  <span className="text-[#9E8C7E]">Zona de entrega:</span>
                  <span className="font-medium text-[#F7EFE6] text-right truncate max-w-[200px]">
                    {deliveryZone === 'tecamac' ? 'Los Héroes Tecámac (+10%)' : 'Zona Norte CDMX (A convenir)'}
                  </span>
                </div>

                {estimate.deliveryExtraAmount > 0 && (
                  <div className="flex items-center justify-between text-[#E8AF50]">
                    <span>Traslado Tecámac / cercanas (+10%):</span>
                    <span className="font-mono font-semibold tabular-nums">
                      + ${estimate.deliveryExtraAmount} MXN
                    </span>
                  </div>
                )}
              </div>

              {/* Total Callout */}
              <div className="space-y-1">
                <span className="text-xs text-[#9E8C7E] block">Total Final Estimado:</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-3xl sm:text-4xl font-extrabold text-[#E8AF50] tabular-nums">
                    ${estimate.total}
                  </span>
                  <span className="text-sm font-semibold text-[#D8B589]">MXN</span>
                </div>
                <p className="text-[11px] text-[#8F7D70] leading-tight">
                  {deliveryZone === 'tecamac'
                    ? '*Incluye el 10% adicional por entrega personal en Los Héroes Tecámac y zonas cercanas.'
                    : '*Punto de entrega personal a convenir en Zona Norte CDMX y zonas cercanas sin costo extra.'}
                </p>
              </div>

              {/* Direct Instant Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="w-full py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-[#17110C] bg-emerald-500 hover:bg-emerald-400 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 transform active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-[#17110C]" />
                  <span>Enviar Presupuesto por WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleSendEmail}
                  className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#F7EFE6] hover:text-white bg-[#2A1F17] hover:bg-[#382B20] border border-[#4D382A] rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4 text-[#E8AF50]" />
                  <span>Enviar a rafajrosales@gmail.com</span>
                </button>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="py-2.5 px-3 text-[11px] font-medium text-[#C7B5A6] hover:text-white bg-[#1A130D] hover:bg-[#251B12] border border-[#36271C] rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copiado' : 'Copiar Texto'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveLocal}
                    className="py-2.5 px-3 text-[11px] font-medium text-[#C7B5A6] hover:text-white bg-[#1A130D] hover:bg-[#251B12] border border-[#36271C] rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    {savedSuccess ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <FileText className="w-3.5 h-3.5" />}
                    <span>{savedSuccess ? 'Guardado' : 'Guardar Ficha'}</span>
                  </button>
                </div>
              </div>

              {/* Delivery Guarantees list */}
              <div className="pt-4 border-t border-[#33251B] text-[11px] text-[#9E8C7E] space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#E8AF50] shrink-0" />
                  <span>Entregas personales a convenir en Zona Norte CDMX (sin costo extra).</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#E8AF50] shrink-0" />
                  <span>Los Héroes Tecámac y zonas cercanas: 10% adicional por traslado.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#E8AF50] shrink-0" />
                  <span>Entrega directa en mano: no realizamos envíos por paquetería foránea.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
