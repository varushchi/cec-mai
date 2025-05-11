
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
  module_id: number,
  title: string,
  order: number,
}

export type PagesProps = {
  id: number,
  lesson_id: number,
  content: string,
}