/**
 * Created by xusenlin on 16/12/21.
 */
var SMonth = {
    option: {"id": "", "year": new Date().getFullYear(), "month": new Date().getMonth()+1, 'linkSign':'-', 'inputClass':'','inputName':''},
    moth:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
    config: function (op) {
        for (var k in this.option) {
            if (op[k])this.option[k] = op[k];
        }
        this.init();
    },
    init:function () {
        var YMDom = document.getElementById(this.option.id);
        YMDom.className = 'SMonth';
        var Html = '';
        Html += '<input class="'+this.option.inputClass+'" name="'+this.option.inputName+'" type="text" value="'+this.option.year+this.option.linkSign+this.option.month+'" />';
        Html += '<div class="date-box">';
        Html +=     '<button type="button" class="xdsoft_prev"></button>';
        Html +=     '<div class="y">'+this.option.year+'年</div>';
        Html +=     '<button type="button" class="xdsoft_next"></button>';
        Html +=     '<table class="month-table">';
        Html +=         '<tbody>';
        for(var i = 0;i<3;i++){
            Html += '<tr>';
            for(var a = 1;a<=4;a++){
                if(this.option.month == a+i*4){
                    Html += '<td><a class="cell active">'+this.moth[a+i*4-1]+'</a></td>';
                }else {
                    Html += '<td><a class="cell">'+this.moth[a+i*4-1]+'</a></td>';
                }
            }
            Html += '</tr>';
        }
        Html +=         '</tbody>';
        Html +=     '</table>';
        Html += '</div>';
        YMDom.innerHTML = Html;
        this.interaction(YMDom);
    },
    interaction:function (YMDom) {
        var YDom = YMDom.getElementsByClassName('y')[0];
        var YBtnArrDom = YMDom.getElementsByTagName('button');
        var ABtnArrDom = YMDom.getElementsByTagName('a');
        var InputBtnDom = YMDom.getElementsByTagName('input')[0];
        var frame = YMDom.getElementsByClassName('date-box')[0];
        var Y = this.option.year;
        var M = this.option.month;//记录上次月份
        var linkSign = this.option.linkSign;
        InputBtnDom.onclick = function (e) {
            window.event? window.event.cancelBubble = true : e.stopPropagation();
            frame.style.display = 'block';
        }
        YBtnArrDom[0].onclick = function(){
            Y--;
            YDom.innerHTML = Y+'年';
            InputBtnDom.value = Y+linkSign+getM(M);

        }
        YBtnArrDom[1].onclick = function(){
            Y++;
            YDom.innerHTML = Y+'年';
            InputBtnDom.value = Y+linkSign+getM(M);
        }

        for (var i = 0 ; i <ABtnArrDom.length; i++) {
            ABtnArrDom[i].index = i;
            ABtnArrDom[i].onclick = function(){
                for (var i = 0 ; i <ABtnArrDom.length; i++) {
                    ABtnArrDom[i].className = 'cell';
                }
                this.className = 'cell active';
                M = this.index+1;
                InputBtnDom.value = Y+linkSign+getM(M);
                setTimeout(function () {
                    frame.style.display = 'none';
                },100)
            }
        }
        frame.onclick = function (e) {
            window.event? window.event.cancelBubble = true : e.stopPropagation();
        }
        function getM(m) {
            if (m == null || m == 0){
                return '00';
            }
            if (m<10) {
                return '0'+m;
            }
            return m;
        }
        document.onclick = function () {
            var frames = document.getElementsByClassName('date-box');
            for (var i = 0;i<frames.length;i++){
                frames[i].style.display = 'none';
            }
        }
    },
}
