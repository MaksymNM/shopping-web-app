export class Products{
    public name: string;
    public description: string;
    public price: number;
    public imgPath: string;
    
    
    constructor(name:string, desc:string, price:number, imgPath:string){
        this.name = name;
        this.description = desc;
        this.price = price;
        this.imgPath = imgPath;
    }
}