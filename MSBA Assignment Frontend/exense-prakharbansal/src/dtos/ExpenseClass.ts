export default class Expense {
    public id?: number | null;
    public name!: string;
    public cost!: number;
    public url!: string;
    public date?: Date | null;
    public remarks!: string;
}