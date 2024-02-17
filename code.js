const lista = document.querySelector('#glownatablica')
const dodaj = document.querySelector('.przycisk')
const rzeczDoKupienia = document.querySelector('.tekst1')
const filter = document.querySelector('#filter')
const clear = document.querySelector('#clear')
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
    RemoveParent(e.target.parentNode)
}

function RemoveParent(item){
    item.remove()

    removeItemFromStorage(item)
    sprawdzaj_czy_pusta_lista()

}
function removeItemFromStorage(item){
    let itemsFromStorage = getItemsFromStorage()
    const tablica = [item.querySelector('li').textContent, item.querySelector('h5').innerText]
    itemsFromStorage = itemsFromStorage.filter((i)=>i[0].trim()!==tablica[0].trim())
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
    filter.className='zniknij'
    clear.className='zniknij'
}

function OnSubmit(e){
    e.preventDefault();
    if(rzeczDoKupienia.value){

        const ile = ilex(rzeczDoKupienia.value.toUpperCase())
        if(ile>0){
            clear.className=''
            filter.className=''

            addToStorage([rzeczDoKupienia.value.toUpperCase(), ile])
            
            dodajDoDOM(rzeczDoKupienia.value.toUpperCase(), ile)


        } else{
            alert('Nie dodajesz żadnego produktu')
        }
    } else{
        alert('Nie dodajesz żadnego produktu')
    }
}

function OnClick(){
    localStorage.clear()
    lista.innerText=""
    lista.className="jebackala"
    filter.className='zniknij'
    clear.className='zniknij'
}

function OnAnyKey(e){
    const items = lista.querySelectorAll('ul')
    const text = e.target.value.toUpperCase()
    // const secondItems= items.querySelectorAll('li')
    let secondItems=[]
    for(let i=0; i<items.length;i++){
        secondItems.push(items[i].querySelector('li'))
    }
    secondItems.forEach(item=>{
        const itemName = item.firstChild.textContent
        if(itemName.indexOf(text)!=-1){
            item.parentNode.style.display='flex'
            console.log(true);
        } else{
            item.parentNode.style.display='none'
        }
    })

}

function dodajDoDOM(co_kupuje, ile){

    if(czyjestwliscie(co_kupuje)===false){
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
        const napis = document.createTextNode(co_kupuje)
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
        const index = czyjestwliscie(co_kupuje)
        const ktore = lista.querySelector(`ul:nth-child(${index})`)
        ktore.querySelector('h5').innerText=Number(ktore.querySelector('h5').innerText)+ile

    }
}

function addToStorage(item){
    let itemsFromStorage = getItemsFromStorage()
    itemsFromStorage.push(item)
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

function getItemsFromStorage(){
    let itemsFromStorage
    if(localStorage.getItem('items')===null){
        itemsFromStorage=[]
    } else{
        itemsFromStorage = JSON.parse(localStorage.getItem('items'))

    }

    return itemsFromStorage

}

function displayItems(){
    const itemsFromStorage = getItemsFromStorage()
    itemsFromStorage.forEach(item=>dodajDoDOM(item[0], item[1]))

}

function sprawdzaj_czy_pusta_lista(){
    if(lista.innerText===''){
        lista.className='zniknij'
        lista.className=''
    } else{
        clear.className=''
        filter.className=''
    }
}

clear.addEventListener('click', OnClick)
form.addEventListener('submit', OnSubmit)
filter.addEventListener('input', OnAnyKey)
document.addEventListener('DOMContentLoaded', displayItems)
document.addEventListener('DOMContentLoaded',sprawdzaj_czy_pusta_lista)
