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

    var calculateTotal = function (type) {

        var sum = 0;
        data.allItems[type].forEach(function (cur) {
            sum += cur.value;
        });

        data.totals[type] = sum;
    }

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage:0
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
        },

        calculateBudget:function(){
            //calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            //calculate the budget:income - expenses
            data.budget = data.totals.inc- data.totals.exp;

            //calculate the p ercentage of income we wanna spend on
            if(data.totals.inc>0){
            data.percentage =Math.round((data.totals.exp/data.totals.inc) *100);
            console.log(data.percentage);}
                else{
                    data.percentage=-1;
                }

        },
        getBudget:function(){
            return {
                budget:data.budget,
                totalInc:data.totals.inc,
                totalExp:data.totals.exp,
                percentage:data.percentage
            }
        },
        deleteItem:function(type, id){

            var ids , index;
           ids= data.allItems[type].map(function(current){
                return current.id;
            });
            index=ids.indexOf(id);

            if(index !== -1){
                data.allItems[type].splice(index,1);
            }
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
        expensesContainer: ".expenses__list",
        budgetLabel: ".budget__value",
        budgetIncomeValue: ".budget__income--value",
        budgetExpenseValue:".budget__expenses--value",
        budgetPercentage: ".budget__expenses--percentage",
        container:'.container'
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
            html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%descripton%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            else if(type === "exp"){
                element =DOMStrings.expensesContainer;

            html ='<div class="item clearfix" id="exp-%id"><div class="item__description">%descripton%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>  </div></div></div>'
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
        },
        displayBudget:function(obj){
            document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMStrings.budgetIncomeValue).textContent = obj.totalInc;
            document.querySelector(DOMStrings.budgetExpenseValue).textContent = obj.totalExp
            if(obj.percentage>0){
            document.querySelector(DOMStrings.budgetPercentage).textContent = obj.percentage;
            }
            else{
                document.querySelector(DOMStrings.budgetPercentage).textContent = "---"
            }
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
            document.querySelector(DOMStr.container).addEventListener('click',ctrlDeleteItem);
    }

    var updateBudget = function () {
        // calculate the budget
        bdgetCtrl.calculateBudget();
        //return the budget
        var budget = bdgetCtrl.getBudget();
        // display the budget
        console.log(budget);
        UICtrl.displayBudget(budget);
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
    var ctrlDeleteItem = function(event){
        var itemId, splitId,type,Id
    itemId = event.target.parentNode.parentNode.parentNode.parentNode.id
        if(itemId){
            splitId = itemId.split('-');
            type=splitId[0]
            Id = parseInt(splitId[1])
            bdgetCtrl.deleteItem(type,Id);
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