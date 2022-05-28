import dayjs from "dayjs";

export  function convert(){
    let res=dayjs('2022/05/29','YYYY/MM/DD').unix();
console.log(res);
}