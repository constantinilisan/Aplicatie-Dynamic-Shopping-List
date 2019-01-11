const add = document.querySelector("#add");
const list = document.querySelector("#lista");
const input = document.querySelector("#shop");
const listFin = document.querySelector("#fin");

function addItem() {
    const el = document.createElement("li");
    el.classList.add("stil4");

    const span = document.createElement("span");    
    span.textContent = input.value;
    span.classList.add("stil3");

    var edit = document.createElement("button");
    edit.textContent = "Edit";
    edit.classList.add("stil2");

    var del = document.createElement("button");
    del.textContent = "Delete";
    del.classList.add("stil2");

     var submit = document.createElement("button");
     submit.textContent = "Submit";
     submit.classList.add("stil2");

    del.addEventListener("click", function(){
        this.parentNode.parentNode.removeChild(this.parentNode);
    });

    edit.addEventListener("click", createEditFunction());

    submit.addEventListener("click", submitItem);

    el.appendChild(span);
    el.appendChild(edit);
    el.appendChild(del);
    el.appendChild(submit);

    list.appendChild(el);

    input.value = "";
}

function createEditFunction(){     
    
    let canEdit = true;

    return function(){ 
        
        if (canEdit){
            const parent = this.parentNode; //referinta la <li>-ul parinte
            const span = parent.firstChild; //referinta la <span>-ul care contine textul

            const editInput = document.createElement("input");                      
            editInput.value = span.textContent;
            editInput.classList.add("stil2");
            editInput.addEventListener("keyup", function(e){
                if (e.key === "Enter"){
                    span.textContent = this.value;
                    span.style.display = "inline";
                    parent.removeChild(this);
                    canEdit = true;
                }
            });    
            parent.insertBefore(editInput, span.nextSibling);
            
            span.style.display = "none";  

            canEdit = false;
        }

    }

}

function submitItem(){ 
    const arr = Array.from(document.querySelectorAll("#fin li"));
    
    const item = document.createElement("li");
    item.innerHTML = this.parentNode.firstChild.innerHTML;
    arr.push(item);
    
    arr.sort(function(a,b){
        return a.innerHTML > b.innerHTML ? 1 : -1;
    });

    arr.forEach(function(element){
        listFin.appendChild(element);
    });
    
    list.removeChild(this.parentNode);
}


// daca se da click pe butonul "Add Item"
add.addEventListener("click", addItem);

// daca se apasa Enter in interiorul input-ului
input.addEventListener("keydown", function(e){    
    if (e.key ==="Enter"){
        addItem();
    }
})
