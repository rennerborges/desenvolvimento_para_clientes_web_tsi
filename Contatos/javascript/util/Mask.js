function MaskTel(tel){
  const telNotFormmated = tel.replace(/[-() ]/g,'');
  return VMasker.toPattern(telNotFormmated, telNotFormmated.length === 10 ? "(99) 9999-9999" : "(99) 99999-9999");
}