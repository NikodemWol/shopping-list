// const form = document.querySelector('.submit-tag')
// const input1 = document.querySelector('.tekst1')
// const input2 = document.querySelector('.tekst2')

// function onSubmit(e){
//     e.preventDefault()
//     if(input1.value === '' || input2.value === ''){
//         alert('Please fill all the gaps')
//         return
//     }
//     else{
//         document.body.style.backgroundColor=input1.value
//         input1.value = ""
//         input2.value = ''
//         console.log(input1.value);
//     }
//     console.log('submit')
// }

// form.addEventListener('submit', onSubmit)

const lista = document.querySelector('#glownatablica')
const dodaj = document.querySelector('.przycisk')
const rzeczDoKupienia = document.querySelector('.tekst1')
const filter = document.querySelector('.filter')
const clear = document.querySelector('.clear')
const form = document.querySelector('form')

function czyjestwliscie(slowo) {
    let sprawdzam
    let sprawdzam2
    let dlugosc = lista.querySelectorAll('ul').length
    if(lista.innerText){
        for(let i = 1; i<= dlugosc; i++){
            sprawdzam = lista.querySelector(`ul:nth-child(${i})`)
            sprawdzam2 = sprawdzam.querySelector('li')
            if(sprawdzam2.innerText.trim()==slowo.trim()){
                return i
            }
        }
    }
    else{
        return false
    }
    return false
}

function ilex(slowo){
    const sprawdz=slowo.slice(-2)
    const indeksx=slowo.indexOf('X')

    if(indeksx!=-1 && (Number.isInteger(slowo.charAt(indeksx+1)/1)|| Number.isNaN(slowo.charAt(indeksx+1)/1))){
        let zwracaj=Number(slowo.slice(-1))
        if(Number.isInteger(slowo.charAt(indeksx+2)/1) && slowo.charAt(indeksx+2)){
            alert('Możesz dodawać maksymalnie 9 produktów na raz')
            rzeczDoKupienia.value=''
            zwracaj=0
        }
        
        if(Number(slowo.charAt(indeksx+1))===0){
            alert('Próbujesz dodać produkt X0...')
            rzeczDoKupienia.value=""
            zwracaj=0
        }
        rzeczDoKupienia.value=rzeczDoKupienia.value.slice(0,indeksx)
        return Number(zwracaj)
    } else{
        return(1)
    }
}

function DeleteParent(e){
    e.target.parentNode.remove()
    if(lista.innerText==''){
        lista.className=""
    }
}

function OnSubmit(e){
    e.preventDefault();
    if(rzeczDoKupienia.value){

        const ile = ilex(rzeczDoKupienia.value.toUpperCase())
        if(ile>0){
            if(czyjestwliscie(rzeczDoKupienia.value.toUpperCase())===false){
                ///tworze tablice
                const newTablica = document.createElement('ul')
                newTablica.className='tablicaWtablicy'
                // 
                /// tworze ilosc
                const newile = document.createElement('h5')
                const napisile= document.createTextNode(ile)
                newile.appendChild(napisile)
                /// tworze nazwe
                lista.className='pojawsie'
                const newItem = document.createElement('li')
                const napis = document.createTextNode(rzeczDoKupienia.value.toUpperCase())
                newItem.appendChild(napis)
                /// tworze znak usun
                const x = document.createElement('button')
                x.className='x'
                const napisdox=document.createTextNode('-')
                x.appendChild(napisdox)
                x.addEventListener('click', DeleteParent)
                /// dodaje wszystko do tablicy
                newTablica.appendChild(x)
                newTablica.appendChild(newItem)
                newTablica.appendChild(newile)
                /// dodaje tablcie do glownej tablicy
                lista.appendChild(newTablica)
                rzeczDoKupienia.value=""
            } else{
                const index = czyjestwliscie(rzeczDoKupienia.value.toUpperCase())
                const ktore = lista.querySelector(`ul:nth-child(${index})`)
                ktore.querySelector('h5').innerText=Number(ktore.querySelector('h5').innerText)+ile

            }
        } else{
            alert('Nie dodajesz żadnego produktu')
        }
    } else{
        alert('Nie dodajesz żadnego produktu')
    }
}

function OnClick(){
    lista.innerText=""
    lista.className="jebackala"
}


clear.addEventListener('click', OnClick)
form.addEventListener('submit', OnSubmit)
