function updateROT(shift) {
  let text = document.getElementById("unshifted");
  rot(text.value, shift);
}
function copy(str) {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};
function rot(str, shift) {
  const decipher=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'," ","!", "?",".","@","#","$","%","^","&","*","(",")","+","-","_","/","'",'"',"[","]",",","<",">","=","`","~","{","}","|","","1","2","3","4","5","6","7","8","9" ];
  const cipher=decipher.slice(26 -shift, 26).concat(decipher.slice(0, 26 -shift)).concat(decipher.slice(26, decipher.length));
  let newStr = '';
  for(let i=0;i<str.length;i++){
    loop: for(let j=0;j<cipher.length;j++){
      if( str[i].toUpperCase() == decipher[j] ){
        if(str[i] == str[i].toUpperCase()) {
          newStr += cipher[j].toUpperCase()
        } else {
          newStr += cipher[j].toLowerCase() 
        }
        break loop;
      }
    }
  }
  let output = document.getElementById("shifted");
  output.value = newStr;
}