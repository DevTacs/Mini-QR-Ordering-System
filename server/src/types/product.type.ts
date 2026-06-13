import type {RowDataPacket} from "mysql2"

export interface Product extends RowDataPacket {
    ProductId: number
    Name: string
    Description: string
    Stock: number
    Price: string
    ImageUrl: string
}
