
type CourseStatus =  "available" | "inprogress" | "completed"

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

export type Questions = {
  id: number,
  test_id: number,
  question: string,
  option_a: string,
  option_b: string,
  option_c: string,
  option_d: string,
  correct_option: string,
}

export type TestsProps = {
    id: number,
    course_id: number,
    module_id?: number,
    lesson_id?: number
    title: string,
}