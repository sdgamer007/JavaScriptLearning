var budgetController = (function () {

    var Expense = function (id, descripton, value) {
        this.id = id;
        this.descripton = descripton;
        this.value = value;
    }
    var Income = function (id, descripton, value) {
        this.id = id;
        this.descripton = descripton;
        this.value = value;
    }

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }

    return {
        additem: function (type, des, val) {
            var newItem, ID;
            // create new id 
            dataContain = data.allItems[type]
            if(dataContain.length>0){
            ID = dataContain[dataContain.length - 1].id + 1
            }
            else{
                ID=0;
            }
            //create new item
            if (type === "exp") {
                newItem = new Expense(ID, des, val)
            } else if (type === "inc") {
                newItem = new Income(ID, des, val)
            }
            //push the item
            dataContain.push(newItem);
            return newItem;
        },
        test:function(){
            console.log(data);
        }
    }
})();


var UIController = (function () {
    //UI
    var DOMStrings = {
        inputType: ".add__type",
        inputDescripton: ".add__description",
        inputValue: ".add__value",
        inputButton: ".add__btn",
        incomeContainer: ".income__list",
        expensesContainer: ".expenses__list"

    }


    return {

        getInput: function () {
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                descripton: document.querySelector(DOMStrings.inputDescripton).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            }
        },
        getDOMStrings: function () {
            return DOMStrings;
        },
        addListItem:function(obj,type){

            var html ;
            if(type ==="inc"){
                element =DOMStrings.incomeContainer;
            html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%descripton%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            else if(type === "exp"){
                element =DOMStrings.expensesContainer;

            html ='<div class="item clearfix" id="income-%id"><div class="item__description">%descripton%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>  </div></div></div>'
            }
            // create html placeholder tags 
    //replace place holder tags with html dataContain
            newhtml = html.replace("%id%", obj.id);
            newhtml = newhtml.replace("%value%", obj.value);
            newhtml = newhtml.replace("%descripton%", obj.descripton);

            //insert html into the dom
            document.querySelector(element).insertAdjacentHTML('beforeend',newhtml);
        },
        clearfields:function(){
            var fields,fieldsArray;
         fields= document.querySelectorAll(DOMStrings.inputDescripton+','+DOMStrings.inputValue);
         fieldsArray=Array.prototype.slice.call(fields)
         fieldsArray.forEach(function(current,index,array){
            current.value="";
        });
        }


    };

})();


var controller = (function (bdgetCtrl, UICtrl) {

    var setupEventListener = function () {
        var DOMStr = UICtrl.getDOMStrings();

        document.querySelector(DOMStr.inputButton).addEventListener('click', addItem);

        document.addEventListener('keypress', function (event) {
            if (event.key == 13) {
                addData();
            }
        })

    }

    var updateBudget = function () {
        // calculate the budget

        //return the budget

        // display the budget
    }

    var addItem = function () {
        var input, newItem;
        input = UICtrl.getInput();
        console.log(input)

        if(input.descripton!=="" && !isNaN(input.value) && input.value>0){
        //add item to the budgetController
        newItem = bdgetCtrl.additem(input.type, input.descripton, input.value);

        UICtrl.addListItem(newItem,input.type);
        UICtrl.clearfields();

        updateBudget();

        }
    }


    //UI
    return {
        init: function () {
            console.log("Application has been initialized")
            setupEventListener();
        }
    }
})(budgetController, UIController);

controller.init();