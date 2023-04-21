import { ICourse } from '..';

export class CourseEntity implements ICourse {
  title: string;
  description: string;
  duration: string;
  requirements: string;
  content: string[];
  adminId: string;

  constructor(
    title: string,
    description: string,
    duration: string,
    requirements: string,
    content: string[],
    adminId: string,
  ) {
    this.title = title;
    this.description = description;
    this.duration = duration;
    this.requirements = requirements;
    this.content = content;
    this.adminId = adminId;
  }
}
