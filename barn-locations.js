// Geographic choices for the existing barn directory. City lists are display names.
const BARN_GEOGRAPHY = {
  GER: ['Germany', 'Europe', 'Aachen, Münster, Hamburg, Munich, Frankfurt'],
  NED: ['Netherlands', 'Europe', 'Ermelo, Valkenswaard, Utrecht, Rotterdam, Amsterdam'],
  BEL: ['Belgium', 'Europe', 'Lanaken, Antwerp, Brussels, Opglabbeek'],
  FRA: ['France', 'Europe', 'Fontainebleau, Paris, Lyon, Bordeaux, Deauville'],
  GBR: ['United Kingdom', 'Europe', 'London, Gloucestershire, Yorkshire, Sussex, Birmingham'],
  IRL: ['Ireland', 'Europe', 'Dublin, Kildare, Cork, Limerick'],
  ITA: ['Italy', 'Europe', 'Milan, Rome, Verona, Florence, Bologna'],
  ESP: ['Spain', 'Europe', 'Madrid, Barcelona, Valencia, Seville'],
  POR: ['Portugal', 'Europe', 'Lisbon, Porto, Cascais'],
  SUI: ['Switzerland', 'Europe', 'Geneva, Zurich, Basel, St. Gallen'],
  SWE: ['Sweden', 'Europe', 'Stockholm, Gothenburg, Flyinge, Malmö'],
  DEN: ['Denmark', 'Europe', 'Copenhagen, Aarhus, Odense'],
  NOR: ['Norway', 'Europe', 'Oslo, Bergen, Stavanger'],
  FIN: ['Finland', 'Europe', 'Helsinki, Turku, Tampere'],
  AUT: ['Austria', 'Europe', 'Vienna, Salzburg, Graz'],
  POL: ['Poland', 'Europe', 'Warsaw, Kraków, Poznań, Wrocław'],
  CZE: ['Czechia', 'Europe', 'Prague, Brno, Ostrava'],
  HUN: ['Hungary', 'Europe', 'Budapest, Debrecen'],
  SVK: ['Slovakia', 'Europe', 'Bratislava, Košice'],
  SLO: ['Slovenia', 'Europe', 'Ljubljana, Maribor'],
  CRO: ['Croatia', 'Europe', 'Zagreb, Split'],
  ROU: ['Romania', 'Europe', 'Bucharest, Cluj-Napoca'],
  BUL: ['Bulgaria', 'Europe', 'Sofia, Plovdiv'],
  GRE: ['Greece', 'Europe', 'Athens, Thessaloniki'],
  TUR: ['Türkiye', 'Europe', 'Istanbul, Ankara, Izmir'],
  LUX: ['Luxembourg', 'Europe', 'Luxembourg City'],
  EST: ['Estonia', 'Europe', 'Tallinn, Tartu'],
  LAT: ['Latvia', 'Europe', 'Riga, Jelgava'],
  LTU: ['Lithuania', 'Europe', 'Vilnius, Kaunas'],
  UKR: ['Ukraine', 'Europe', 'Kyiv, Lviv, Odesa'],
  SRB: ['Serbia', 'Europe', 'Belgrade, Novi Sad'],
  KAZ: ['Kazakhstan', 'Asia', 'Almaty, Astana, Shymkent, Karaganda'],
  UZB: ['Uzbekistan', 'Asia', 'Tashkent, Samarkand'],
  KGZ: ['Kyrgyzstan', 'Asia', 'Bishkek, Osh'],
  CHN: ['China', 'Asia', 'Beijing, Shanghai, Guangzhou, Shenzhen'],
  JPN: ['Japan', 'Asia', 'Tokyo, Osaka, Kyoto, Nagoya'],
  KOR: ['South Korea', 'Asia', 'Seoul, Busan, Incheon'],
  IND: ['India', 'Asia', 'New Delhi, Mumbai, Bengaluru'],
  THA: ['Thailand', 'Asia', 'Bangkok, Chiang Mai'],
  MAS: ['Malaysia', 'Asia', 'Kuala Lumpur, Johor Bahru'],
  SGP: ['Singapore', 'Asia', 'Singapore'],
  INA: ['Indonesia', 'Asia', 'Jakarta, Bandung'],
  PHI: ['Philippines', 'Asia', 'Manila, Cebu'],
  MGL: ['Mongolia', 'Asia', 'Ulaanbaatar'],
  VIE: ['Vietnam', 'Asia', 'Hanoi, Ho Chi Minh City'],
  QAT: ['Qatar', 'Asia', 'Doha, Al Rayyan'],
  UAE: ['United Arab Emirates', 'Asia', 'Dubai, Abu Dhabi, Sharjah'],
  KSA: ['Saudi Arabia', 'Asia', 'Riyadh, Jeddah, Al Khobar'],
  BRN: ['Bahrain', 'Asia', 'Manama'],
  KUW: ['Kuwait', 'Asia', 'Kuwait City'],
  OMA: ['Oman', 'Asia', 'Muscat'],
  JOR: ['Jordan', 'Asia', 'Amman'],
  ISR: ['Israel', 'Asia', 'Tel Aviv, Jerusalem'],
  USA: ['United States', 'Americas', 'Wellington, Ocala, Lexington, Tryon, Thermal, New York, Los Angeles'],
  CAN: ['Canada', 'Americas', 'Calgary, Toronto, Vancouver, Ottawa, Montréal'],
  MEX: ['Mexico', 'Americas', 'Mexico City, Guadalajara, Monterrey'],
  BRA: ['Brazil', 'Americas', 'São Paulo, Rio de Janeiro, Curitiba'],
  ARG: ['Argentina', 'Americas', 'Buenos Aires, Córdoba, Rosario'],
  CHI: ['Chile', 'Americas', 'Santiago, Valparaíso'],
  COL: ['Colombia', 'Americas', 'Bogotá, Medellín'],
  URU: ['Uruguay', 'Americas', 'Montevideo, Punta del Este'],
  PER: ['Peru', 'Americas', 'Lima, Arequipa'],
  ECU: ['Ecuador', 'Americas', 'Quito, Guayaquil'],
  CRC: ['Costa Rica', 'Americas', 'San José'],
  AUS: ['Australia', 'Oceania', 'Sydney, Melbourne, Brisbane, Adelaide, Perth'],
  NZL: ['New Zealand', 'Oceania', 'Auckland, Hamilton, Christchurch, Wellington'],
  FIJ: ['Fiji', 'Oceania', 'Suva'],
  RSA: ['South Africa', 'Africa', 'Johannesburg, Pretoria, Cape Town, Durban'],
  MAR: ['Morocco', 'Africa', 'Casablanca, Rabat, Marrakesh'],
  EGY: ['Egypt', 'Africa', 'Cairo, Alexandria'],
  TUN: ['Tunisia', 'Africa', 'Tunis'],
  KEN: ['Kenya', 'Africa', 'Nairobi'],
  NAM: ['Namibia', 'Africa', 'Windhoek'],
  ZIM: ['Zimbabwe', 'Africa', 'Harare'],
};
const BARN_COUNTRY_KEYS = { USA: 'USA', GBR: 'UK' };
function barnCountryKey(code) {
  return BARN_COUNTRY_KEYS[code] || BARN_GEOGRAPHY[code][0];
}
function barnLocationChoices() {
  const locations = Object.fromEntries(Object.entries(BARN_COUNTRIES).map(([country,cities]) => [country,[...cities]]));
  for (const [code,[,,cities]] of Object.entries(BARN_GEOGRAPHY)) {
    const country = barnCountryKey(code);
    locations[country] = [...new Set([...(locations[country] || []),...cities.split(', ')])];
  }
  for (const barn of [...app.barnCatalog,app.currentBarn].filter(Boolean)) {
    if (barn.country && barn.city && !(locations[barn.country] ||= []).includes(barn.city)) locations[barn.country].push(barn.city);
  }
  return locations;
}
function barnLocationListings(country, city) {
  const listed = app.barnCatalog.filter(barn => barn.country === country && barn.city === city);
  if (app.currentBarn?.country === country && app.currentBarn.city === city &&
      !listed.some(barn => barn.id === app.currentBarn.id)) listed.push(app.currentBarn);
  if (listed.length) return listed;
  const key = JSON.stringify([country,city]);
  const directory = app.barnLocationCatalog ||= {};
  return [directory[key] ||= createBarnListing(country,[city],new Set())];
}
