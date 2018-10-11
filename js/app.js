Vue.directive('focus',{
    inserted(el){
        el.focus();
    }
})
var vm = new Vue({
    el:'#app',
    data:{
        xg:false,
        all:false,
        cpl:false,
        key:'',
        alc:true,
        coc:false,
        acc:false,
        unfinished:0,
        id:'',
        newJob:'',
        list:[{id:1,work:'吃饭',complete:false},{id:2,work:'睡觉',complete:false},{id:3,work:'打豆豆',complete:false},{id:4,work:'看动漫',complete:false}]
    },
    methods:{
        check() {
            var newArray =[]
            console.log(1)
            console.log(this.list)
            this.list.forEach(item => {
            if(!item.complete){
                newArray.push(item);
            }
            })
            this.unfinished = newArray.length
        },
        addJob() {
            if(this.newJob.trim()===''){
                return
            }
            this.all = false
            this.newJob = {
                id:+new Date(),
                work:this.newJob,
                complete:false
            }
            this.list.push(this.newJob)
            this.newJob = ''
            this.check()
        },
        del(id){
            this.list.some((item,index) => {
                if(item.id === id){
                    this.list.splice(index,1);
                    return
                }
            })
            this.check()
        },
        allComplete(){
            this.all = !this.all;
            this.list.forEach(item => {
                item.complete = this.all
            })
        },
        edit(id){
            this.id = id;
            this.xg = true;
        },
        over(){
            this.id = '';
            this.xg = false;
        },
        complete(id){
            this.list.forEach(item => {
                if(item.id === id){
                    item.complete = !item.complete
                }
            })
            var newArray =[]
            this.list.some((item,index) => {
                if(item.complete){
                    newArray.push(item);
                }
            })
            if(newArray.length === this.list.length){
                this.all = true;
            }else{
                this.all = false;
            }
            this.check()
        },
        allChecked(){
            this.alc = true
            this.acc = false
            this.coc = false
            this.key = ''
        },
        activeChecked(){
            this.alc = false
            this.acc = true
            this.coc = false
            this.key = false
        },
        completedChecked(){
            this.alc = false
            this.acc = false
            this.coc = true
            this.key = true
        },
        search(key){
            var newArray = []
            if(key === ''){
                newArray = this.list
                return newArray
            }
            this.list.forEach(item => {
                if(item.complete === key){
                    newArray.push(item);
                }
            })
            console.log(newArray)
            return newArray
        },
        clear(){
            this.list = this.list.filter(item => {
                return !item.complete
            })
            this.check()
            this.all = false
        }
    },
    created(){
        this.check();
    }
})