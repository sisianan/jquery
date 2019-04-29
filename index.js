class Random {
    constructor(){
        let ran = Math.random().toFixed(2);
        let num = parseInt(ran*100000);
        this.num = num;
        this.ran = ran;
    };
};
function create(){
    let Deferred = $.Deferred();
    let itemArr = [];
    for(var i = 0;i < 50;i++){
        itemArr.push(new Random());
    };
    if(itemArr.length === 50){
        Deferred.resolve(itemArr);
    };
    return Deferred.promise()
};
function render(arr,num){
    let $li = $('.hide-text');
    let one = 'red';
    let two = 'orange';
    let three = 'yellow';
    let DomArr = [];
    arr.forEach((ele,index)=>{
        let old = '';
        let color = 'blue';
       if(ele.ran >= 0.5){
           old = '新';
        };
        switch(index + 1){
            case 1:{
                color = one;
                break;
            }
            case 2:{
                color = two;
                break;
            }
            case 3:{
                color = three;
            }
        }
      DomArr.push( $li.clone().find('span:first').text(index + 1).css('backgroundColor',color)
       .next('div').find('span:first').text(ele.num)
       .next('span').text(old).closest('div.text')
       .next('span').text(`${ele.ran}万`)
       .closest('li.hide-text').css('display','block') );
    });
     return DomArr;
};
function append(arr,num = 10){
    $('ul.list').html('');
    for(var i = num - 10;i < num;i++){
        arr[i].appendTo('ul.list');
    }
}
function bindEvent(arr,num){
    $('.header').find('span').eq(1).on('click',function(){
         num === 50 ? num = 10 : num += 10;
         append(arr,num); 
    })
}
function init(){
    let a = 10;
    $.when(create()).done(function(data){
         let DomArr = render(data,a);
         append(DomArr);
         bindEvent(DomArr,a);
    });
   
}
// console.log($('.hide-text'))
init();