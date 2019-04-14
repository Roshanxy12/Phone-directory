function fnccopytext()
{
   document.getElementById('cp').innerHTML  = fullname.value;
   document.getElementById('unq').style.color = 'crimson';   
}
function fnccopytext1()
{
   document.getElementById('unq1').style.color = 'crimson';   
}
 
window.onload = function(){
    
    var quickAddBtn = document.getElementById('QuickAdd');
    var quickAddFormDiv = document.querySelector('.quickaddForm')
    var cancelBtn = document.getElementById('Cancel');
    var AddBtn = document.getElementById('Add');
    var fullname = document.getElementById('fullname');
    var phone = document.getElementById('phone');
     var addBookDiv = document.querySelector('.addbook');

    quickAddBtn.addEventListener("click", function(){
           quickAddFormDiv.style.display = "block";
       QuickAdd.style.display = "none";
    });

    cancelBtn.addEventListener("click", function(){
        quickAddFormDiv.style.display = "none";
       QuickAdd.style.display = "block";
    });

    AddBtn.addEventListener("click", addToBook);

    addBookDiv.addEventListener("click", removeEntry);

     
    var addressBook = [];

    
    function jsonStructure(fullname,phone ){
        this.fullname = fullname;
        this.phone = phone; 
    }

    function addToBook(){
        var isNull = fullname.value!='' && phone.value!='' ;
        if(isNull){ 
            var obj = new jsonStructure(fullname.value,phone.value );
            addressBook.push(obj);
            localStorage['addbook'] = JSON.stringify(addressBook);
            quickAddFormDiv.style.display = "none";
            clearForm();
            showAddressBook();
        }
    }

    function removeEntry(e){
        // Remove an entry from the addressbook
        if(e.target.classList.contains('delbutton')){
            var remID = e.target.getAttribute('data-id');
            addressBook.splice(remID,1);
            localStorage['addbook'] = JSON.stringify(addressBook);
            showAddressBook();
        }
    }

    function clearForm(){
        var formFields = document.querySelectorAll('.formFields');
        for(var i in formFields){
            formFields[i].value = '';
        }
    }

    function showAddressBook(){
        if(localStorage['addbook'] === undefined){
            localStorage['addbook'] = '';
        } else {
            addressBook = JSON.parse(localStorage['addbook']);
            // Loop over the array addressBook and insert into the page
            addBookDiv.innerHTML = '';
            for(var n in addressBook){
                var str = '<div class="entry">';
                    str += '<div class="name"><p>' + addressBook[n].fullname + '</p></div>'; 
                    str += '<div class="phone"><p>' + addressBook[n].phone + '</p></div>';  
                    str += '<div class="del"><a href="#" class="delbutton" data-id="' + n + '">Delete</a></div>';
                    str += '</div>';
                addBookDiv.innerHTML += str;
            }
        }
    }

    showAddressBook();

}