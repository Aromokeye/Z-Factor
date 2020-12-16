const hide = document.querySelector('.switch')
const show = document.querySelector('.stretch')
const row = document.querySelector('.long')

show.addEventListener('focus', ()=>{
    hide.classList.add('hide')
    row.classList.remove('s6')
    row.classList.add('s12')
})

const form = document.querySelector('form')
form.addEventListener('submit', submitForm)
function submitForm(event){
    event.preventDefault()
    let zFactor = null
    const tpr = document.getElementById('tpr').value
    const ppr = document.getElementById('ppr').value

   if(ppr >= 0.1 && ppr <= 2.99){
       if(tpr >=1.05 && tpr <= 1.2 ){
            zFactor = (6.8875605 * tpr)+(-1.0436231 * ppr)+(-2.6676404 * Math.pow(tpr, 2)) +
                    (0.1303664*(Math.pow(ppr, 2)))+(0.3795068*(tpr*ppr))-3.2219972
                
       }
       
       if(tpr >=1.2 && tpr <= 2.0){
            zFactor= (1.5323799*tpr)+(-0.4121281*ppr)+(-0.4684477* Math.pow(tpr, 2))+
                    (0.0147404*(Math.pow(ppr, 2)))+(0.1828234*(tpr*ppr))-0.2172753
                
       }
       
       if(tpr >= 2.0 && tpr <= 3.0){
            zFactor =(0.1275471*tpr)+(-0.0714658*ppr)+(-0.0224132*Math.pow(tpr, 2))+
                    (0.0018574*(Math.pow(ppr, 2)))+(0.0241995*(tpr*ppr))+0.8214235
                
       }

   }else if(ppr >= 3.00 && ppr <= 8.00){
       if(tpr >= 1.05 && tpr <= 1.2){
           zFactor = (0.7124665*tpr)+(0.3694465*ppr)+(0.3409197*Math.pow(tpr, 2))+
                    (0.0016586*(Math.pow(ppr, 2)))+(-0.2491262*(tpr*ppr))-1.0494353
                
       }

       if(tpr >= 1.2 && tpr <= 2.0){
           zFactor = (1.3059620*tpr)+(0.0838507*ppr)+(-0.1945660*Math.pow(tpr, 2))+
                    (0.0061400*(Math.pow(ppr, 2)))+(-0.0656840*(tpr*ppr))-0.7952649
                
       }

       if(tpr >= 2.0 && tpr <= 3.0){
           zFactor = (0.3691067*tpr)+(0.0207613*ppr)+(-0.0480460*Math.pow(tpr, 2))+
                    (0.0022844*(Math.pow(ppr, 2)))+(-0.0092499*(tpr*ppr))+0.3478762
                
       }
   }
   const result = document.querySelector('.result')
   result.classList.remove('scale-out')
   result.classList.add('scale-in')
   return result.innerText = zFactor
}