/**
 * Fidyah Care — Unit-First Fidyah Calculator (RULE-09, RULE-10, 02_SRS_v2.0.md §6)
 * Unit pokok: 1 Mud per hari makanan pokok (beras di Indonesia).
 * Konversi gram & uang transparan berdasarkan kerangka terpilih, tanpa universal hardcoding.
 */

export const CONVERSION_FRAMEWORKS = {
  STAPLE_FOOD: [
    {
      id: 'mud_shafii_675',
      name: '675 gram — Rujukan yang umum digunakan',
      gramsPerDay: 675,
      source_ids: ['SRC-NU-002', 'SRC-MUI-001'],
      citation: 'Rujukan: NU Online & MUI',
      description: 'Takaran 1 mud setara cakupan dua telapak tangan orang dewasa sedang, lazim dirujuk di Indonesia sekitar 675 gram (0,675 kg) beras.'
    },
    {
      id: 'mud_ikhtiyath_750',
      name: '750 gram — Lebih hati-hati',
      gramsPerDay: 750,
      source_ids: ['SRC-NU-002'],
      citation: 'NU Online (Pendekatan Ikhtiyath)',
      description: 'Pendekatan pembulatan ke atas (3/4 kilogram atau 0,75 kg) untuk memastikan tercapainya kecukupan kadar 1 mud secara meyakinkan.'
    },
    {
      id: 'mud_custom',
      name: 'Kustom',
      gramsPerDay: null,
      source_ids: ['SRC-QURAN-001'],
      citation: 'Penyesuaian Mandiri Berdasarkan Takaran Lokal',
      description: 'Input mandiri berat beras per mud sesuai standar daerah atau timbangan pribadi.'
    }
  ],
  MONETARY: [
    {
      id: 'baznas_ri_2026',
      name: 'BAZNAS RI 2026',
      amountPerDay: 65000,
      year: 2026,
      source_ids: ['SRC-BAZNAS-002'],
      citation: 'Acuan BAZNAS RI 2026',
      description: 'Ketetapan BAZNAS RI tahun 2026 untuk penyaluran paket makanan bergizi siap saji senilai Rp65.000/jiwa/hari (acuan BAZNAS RI 2026, bukan tarif universal mutlak).'
    },
    {
      id: 'baznas_daerah_custom',
      name: 'BAZNAS Daerah / Kustom',
      amountPerDay: null,
      year: 2026,
      source_ids: ['SRC-BAZNAS-003'],
      citation: 'Sesuai ketetapan daerah setempat',
      description: 'Nominal rupiah per hari yang disesuaikan dengan ketetapan BAZNAS daerah setempat atau standar biaya makan lokal.'
    }
  ]
};

/**
 * Menghitung rincian fidyah berdasarkan jumlah hari dan kerangka yang dipilih
 */
export function calculateFidyah({
  days = 1,
  stapleFrameworkId = 'mud_shafii_675',
  customGrams = 675,
  includeMonetary = false,
  monetaryFrameworkId = 'baznas_ri_2026',
  customMonetaryAmount = 65000,
  sourcesMap = new Map()
}) {
  const safeDays = Math.max(1, parseInt(days, 10) || 1);

  // 1. Perhitungan Satuan Pokok (Unit-First: 1 Mud per hari)
  const totalMud = safeDays * 1;

  // 2. Perhitungan Konversi Gram Makanan Pokok (Beras)
  const stapleConfig = CONVERSION_FRAMEWORKS.STAPLE_FOOD.find(f => f.id === stapleFrameworkId) 
    || CONVERSION_FRAMEWORKS.STAPLE_FOOD[0];
  
  const effectiveGramsPerDay = stapleConfig.id === 'mud_custom' 
    ? Math.max(100, parseInt(customGrams, 10) || 675)
    : stapleConfig.gramsPerDay;

  const totalGrams = safeDays * effectiveGramsPerDay;
  const totalKg = totalGrams / 1000;
  const roundedKg = Math.round(totalKg * 100) / 100;

  // 3. Perhitungan Kerangka Moneter (Uang) jika diaktifkan
  let monetaryResult = null;
  if (includeMonetary) {
    const monetaryConfig = CONVERSION_FRAMEWORKS.MONETARY.find(m => m.id === monetaryFrameworkId)
      || CONVERSION_FRAMEWORKS.MONETARY[0];
    
    const effectiveAmountPerDay = monetaryConfig.id === 'baznas_daerah_custom'
      ? Math.max(1000, parseInt(customMonetaryAmount, 10) || 50000)
      : monetaryConfig.amountPerDay;

    const totalMonetary = safeDays * effectiveAmountPerDay;

    monetaryResult = {
      frameworkId: monetaryConfig.id,
      frameworkName: monetaryConfig.name,
      year: monetaryConfig.year,
      amountPerDay: effectiveAmountPerDay,
      totalAmount: totalMonetary,
      totalFormatted: formatRupiah(totalMonetary),
      citation: monetaryConfig.citation,
      source_ids: monetaryConfig.source_ids,
      ikhtilaf_note: 'Perhatian Ikhtilaf: Penyerahan fidyah dalam bentuk uang (qimah) didasarkan pada Mazhab Hanafi. Mayoritas ulama (Maliki, Syafi\'i, Hanbali) menganjurkan penyerahan dalam bentuk makanan pokok mentah (beras).'
    };
  }

  // Himpun seluruh source ID yang terlibat
  const allSourceIds = [
    'SRC-QURAN-001',
    ...(stapleConfig.source_ids || []),
    ...(monetaryResult ? monetaryResult.source_ids : [])
  ];
  const uniqueSourceIds = [...new Set(allSourceIds)];

  const verifiedSources = uniqueSourceIds.map(sid => {
    const s = sourcesMap.get(sid);
    return s ? { id: s.id, title: s.title, url: s.url, category: s.category } : { id: sid, title: sid };
  });

  return {
    days: safeDays,
    primary_unit: {
      unit_name: 'Mud',
      per_day: 1,
      total_units: totalMud,
      unit_label: `${totalMud} Mud Makanan Pokok`
    },
    staple_food: {
      food_type: 'Beras (Bahan Makanan Pokok Indonesia)',
      framework_id: stapleConfig.id,
      framework_name: stapleConfig.name,
      grams_per_day: effectiveGramsPerDay,
      total_grams: totalGrams,
      total_kg: roundedKg,
      total_kg_exact: totalKg,
      description: stapleConfig.description,
      citation: stapleConfig.citation
    },
    monetary: monetaryResult,
    distribution_guidance: {
      recipient: 'Fakir atau miskin',
      methods: [
        'Satu mud makanan pokok untuk setiap hari yang ditinggalkan.',
        'Dapat disalurkan secara amanah melalui lembaga amil resmi (seperti BAZNAS atau LAZ terakreditasi).'
      ]
    },
    sources: verifiedSources,
    source_ids: uniqueSourceIds
  };
}

/**
 * Helper format rupiah
 */
export function formatRupiah(number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(number);
}
