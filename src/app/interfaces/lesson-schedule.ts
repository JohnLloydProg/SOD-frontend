import { Class } from "./class";
import { Coach } from "./coach";

export interface LessonSchedule {
    id:number,
    lesson:Class,
    branch:number,
    students:number[],
    coach:Coach,
    weekday:number,
    start_time:string,
    max_students:number
}
