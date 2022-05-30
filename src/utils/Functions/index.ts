export  const getId = function(){
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export const getTime = ()=>{
  return + new Date();
}

export const chunk = (arr : any, size : number) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );