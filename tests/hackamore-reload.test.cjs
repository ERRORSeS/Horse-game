const {check} = require('./behavior5-harness.cjs');

check('empty bit slots stay empty for saved hackamores and genuine conflicts remain visible', `{
  resetGame(); app.settings.tackOwnership = false;
  const horseId = app.horses[0].id;
  for (const bit of [null, undefined, '', 'None', 'No bit', 'Unselected', 'equipment-removed', 'Jumping Saddle']) {
    const horse = app.horses.find(h => h.id === horseId);
    horse.tack = { bridle:'Hackamore', saddle:'Jumping Saddle', pad:'Basic Cotton Pad', bit };
    if (eqCombination(horse.tack)) throw Error('false conflict before reload: ' + bit);
    hydrateFromSave(JSON.parse(serializeAppState()));
    const loaded = app.horses.find(h => h.id === horseId);
    if (eqCombination(eqSetup(loaded))) throw Error('phantom bit after reload: ' + bit);
  }
  const horse = app.horses.find(h => h.id === horseId);
  const invalid = eqSaveSetup(horse, {bridle:'Hackamore',bit:'Gag Bit'});
  if (invalid.ok || !invalid.message.includes('Gag Bit')) throw Error('real conflict lost');
  if (!eqSaveSetup(horse,{bridle:'Hackamore',bit:'No bit'}).ok || eqSetup(horse).bit) throw Error('bitless switch');
  if (!eqSaveSetup(horse,{bridle:'Snaffle Bridle',bit:'Loose Ring Snaffle'}).ok) throw Error('bitted switch');
}`);

check('owned inventory resolves real bit references without consuming unequipped items', `{
  resetGame();
  const horse = app.horses[0]; app.settings.tackOwnership = true;
  const hack = mgNewItem('Hackamore',{size:mgHorseSize(horse)}), bit = mgNewItem('Gag Bit',{size:mgHorseSize(horse)});
  mgState().items.push(hack,bit);
  if (eqSaveSetup(horse,{bridle:hack.id,bit:bit.id}).ok) throw Error('owned conflict missed');
  if (!eqSaveSetup(horse,{bridle:hack.id,bit:''}).ok || eqSetup(horse).bit || !mgOwned(bit.id)) throw Error('empty owned setup');
  horse.equipmentRefs.bit = 'deleted-item';
  if (eqCombination(eqSetup(horse))) throw Error('stale ref is a phantom bit');
}`);
