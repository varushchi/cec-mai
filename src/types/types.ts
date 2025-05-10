
export type CourseStatus =  "available" | "inprogress" | "completed"

export type CourseProps = {
  id: string,
  title: string,
  slug?: string,
  description?: string,
  status?: CourseStatus,
  isImported?: boolean,
  progress?: string,
}

export type ModulesProps = {
  id: number,
  course_id: number,
  title: string
}

export type LessonsProps = {
  id: number,
  lesson_id: number,
  title: string,
  content: string | null,
  order: number,
}