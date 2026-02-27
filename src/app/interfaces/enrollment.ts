import { LessonSchedule } from "./lesson-schedule";

export interface Enrollment {
    id:number,
    lesson_schedule:LessonSchedule,
    scheduled_date:Date,
    receipt:string,
    enrolled_at:Date
}
