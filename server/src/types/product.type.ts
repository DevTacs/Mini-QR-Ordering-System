import type {RowDataPacket} from "mysql2"

export interface Item extends RowDataPacket {
    ItemId: number
    Name: string
    Description: string
    Stock: number
    Price: string
    ImageUrl: string
}
