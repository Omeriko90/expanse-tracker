import {  Option } from "../types";
import { DirectionsBusOutlined, FastfoodOutlined, HandymanOutlined, HealthAndSafetyOutlined, HouseOutlined, MedicalServicesOutlined, PaidOutlined, PendingOutlined, ShoppingCartOutlined, TheaterComedyOutlined } from "@mui/icons-material";

export const ONE_HOUR_IN_MS = 1000 * 60 * 60;

export const SORT_BY_OPTIONS: Option[] = [
  { id: "created_at", label: "Created At" },
  { id: "category_id", label: "Category" },
  { id: "amount", label: "Amount" },
];


export const CATEGORIES_ICONS: {[key: string]: any} = {
 'housing': HouseOutlined,
'transportation': DirectionsBusOutlined,
'food': FastfoodOutlined, 
'utilities': HandymanOutlined,
'insurance': HealthAndSafetyOutlined,
'medical_healthcare': MedicalServicesOutlined, 
'saving_investing_debt_payments': PaidOutlined,
'personal': ShoppingCartOutlined, 
'entertainment': TheaterComedyOutlined, 
'other': PendingOutlined, 
}
