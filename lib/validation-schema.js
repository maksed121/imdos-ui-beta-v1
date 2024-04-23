import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const classSchema = z.object({
  name: z.string().refine((val) => val.length > 0, "Title is required"),
  category: z.string().refine((val) => val.length > 0, "Category is required"),
  status: z.string().refine((val) => val.length > 0, "Status is required"),
});

export const subjectSchema = z.object({
  name: z.string().refine((val) => val.length > 0, "Title is required"),
  class_id: z.string().refine((val) => val.length > 0, "Class is required"),
  status: z.string().refine((val) => val.length > 0, "Status is required"),
});

export const chapterSchema = z.object({
  name: z.string().refine((val) => val.length > 0, "Title is required"),
  subject_id: z.string().refine((val) => val.length > 0, "Subject is required"),
  status: z.string().refine((val) => val.length > 0, "Status is required"),
});

export const facultySchema = z.object({
  name: z.string().refine((val) => val.length > 0, "Title is required"),
  email: z.string().email("Invalid email address"),
  type: z.string().refine((val) => val.length > 0, "Type is required"),
  status: z.string().refine((val) => val.length > 0, "Status is required"),
  phone: z.union([z.string(), z.number().int()]).refine((val) => {
    const phoneNumber = String(val);
    return phoneNumber.length === 10 && /^\d+$/.test(phoneNumber);
  }, "Phone must be a 10-digit"),
});

export const videoSchema = z.object({
  title: z.string().refine((val) => val.length > 0, "Title is required"),
  type: z.string().refine((val) => val.length > 0, "Type is required"),
  status: z.string().refine((val) => val.length > 0, "Status is required"),
  duration: z
    .string()
    .refine((val) => {
      // Check if the string is in the "HH:MM:SS" format
      const regex = /^\d{2}:\d{2}:\d{2}$/;
      return regex.test(val);
    }, "Duration must be in the format HH:MM:SS")
    .refine((val) => {
      // Additional check to ensure each component is within valid range
      const [hours, minutes, seconds] = val.split(":").map(Number);
      return (
        hours >= 0 &&
        hours < 24 &&
        minutes >= 0 &&
        minutes < 60 &&
        seconds >= 0 &&
        seconds < 60
      );
    }, " Duration components must be within valid range"),
  chapter_id: z
    .string()
    .refine((val) => val.length > 0, "Chapter ID is required"),
  thumbnail: z.string().refine((val) => {
    try {
      new URL(val);
      return true;
    } catch {
      return false;
    }
  }, "Thumbnail URL is required"),
  url: z.string().refine((val) => {
    try {
      new URL(val);
      return true;
    } catch {
      return false;
    }
  }, "URL is required"),
});

export const liveSchema = z.object({
  title: z.string().refine((val) => val.length > 0, "Title is required"),
  type: z.string().refine((val) => val.length > 0, "Type is required"),
  status: z.string().refine((val) => val.length > 0, "Status is required"),
  teacher_id: z.string().refine((val) => val.length > 0, "Teacher is required"),
  duration: z
    .string()
    .refine((val) => {
      // Check if the string is in the "HH:MM:SS" format
      const regex = /^\d{2}:\d{2}:\d{2}$/;
      return regex.test(val);
    }, "Duration must be in the format HH:MM:SS")
    .refine((val) => {
      // Additional check to ensure each component is within valid range
      const [hours, minutes, seconds] = val.split(":").map(Number);
      return (
        hours >= 0 &&
        hours < 24 &&
        minutes >= 0 &&
        minutes < 60 &&
        seconds >= 0 &&
        seconds < 60
      );
    }, " Duration components must be within valid range"),
  thumbnail: z.string().refine((url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }, "Thumbnail URL is required"),
  url: z.string().refine((val) => {
    try {
      new URL(val);
      return true;
    } catch {
      return false;
    }
  }, "URL is required"),
  chapter_id: z
    .string()
    .refine((val) => val.length > 0, "Chapter ID is required"),
});

export const noteSchema = z.object({
  title: z.string().refine((val) => val.length > 0, "Title is required"),
  file: z.string().refine((url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }, "File URL is required"),
  status: z.string().refine((val) => val.length > 0, "Status is required"),
  chapter_id: z
    .string()
    .refine((val) => val.length > 0, "Chapter ID is required"),
});

export const studentSchema = z.object({
  name: z.string().refine((val) => val.length > 0, "Name is required"),
  roll_no: z.string().refine((val) => val.length > 0, "Roll No is required"),
  section: z.string().refine((val) => val.length > 0, "Section is required"),
  class_id: z.string().refine((val) => val.length > 0, "Class is required"),
  co: z.string().refine((val) => val.length > 0, "Care of is required"),
  dob: z.string().refine((val) => val.length > 0, "DOB is required"),
  gender: z.string().refine((val) => val.length > 0, "Gender is required"),
  address: z.string().refine((val) => val.length > 0, "Address is required"),
  status: z.string().refine((val) => val.length > 0, "Status is required"),
  phone: z.union([z.string(), z.number().int()]).refine((val) => {
    const phoneNumber = String(val);
    return phoneNumber.length === 10 && /^\d+$/.test(phoneNumber);
  }, "Phone must be a 10-digit"),
});

export const courseSchema = z.object({
  title: z.string().refine((val) => val.length > 0, "Title is required"),
  slug: z.string().refine((val) => val.length > 0, "Slug is required"),
  class_id: z.string().refine((val) => val.length > 0, "Class is required"),
  status: z.string().refine((val) => val.length > 0, "Status is required"),
  short_description: z
    .string()
    .refine((val) => val.length > 0, "Short Description is required"),
  description: z
    .string()
    .refine((val) => val.length > 0, "Description is required"),
  duration: z.any().refine((val) => val > 0, {
    message: "Duration must be a positive number",
  }),
  thumbnail: z.string().refine((url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }, "Thumbnail URL is required"),
  promo_video: z.string().refine((url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }, "Promo URL is required"),
  original_price: z
    .string()
    .refine((val) => val.length > 0, "Original price is required"),
  selling_price: z
    .string()
    .refine((val) => val.length > 0, "Selling price is required"),
  subject_ids: z
    .any()
    .refine((val) => val != "[]", "Subject id's are required"),
  instructor_ids: z
    .any()
    .refine((val) => val != "[]", "Instructor id's are required"),
});

export const subscriptionSchema = z.object({
  user_id: z.string().refine((val) => val.length > 0, "User is required"),
  course_id: z.string().refine((val) => val.length > 0, "Course is required"),
  status: z.string().refine((val) => val.length > 0, "Status is required"),
  course_price: z.number().refine((val) => val > 0, {
    message: "Course price must be a positive number",
  }),
  transaction_id: z
    .string()
    .refine((val) => val.length > 0, "Transaction ID is required"),
  expire_date: z
    .string()
    .refine((val) => val.length > 0, "Expire date of is required"),
});

export const branchSchema = z.object({
  name: z.string().refine((val) => val.length > 0, "Name is required"),
  email: z.string().email("Invalid email address"),
  api_key: z.string().refine((val) => val.length > 0, "API key is required"),
  address: z.string().refine((val) => val.length > 0, "Address is required"),
  phone: z.union([z.string(), z.number().int()]).refine((val) => {
    const phoneNumber = String(val);
    return phoneNumber.length === 10 && /^\d+$/.test(phoneNumber);
  }, "Phone must be a 10-digit"),
  endpoint: z.string().refine((url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }, "Endpoint URL is required"),
});

export const adminSchema = z.object({
  name: z.string().refine((val) => val.length > 0, "Title is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().refine((val) => val.length > 0, "Password is required"),
  role: z.string().refine((val) => val.length > 0, "Role is required"),
  status: z.string().refine((val) => val.length > 0, "Status is required"),
  branch_id: z
    .string()
    .refine((val) => val.length > 0, "Branch ID is required"),
  phone: z.union([z.string(), z.number().int()]).refine((val) => {
    const phoneNumber = String(val);
    return phoneNumber.length === 10 && /^\d+$/.test(phoneNumber);
  }, "Phone must be a 10-digit"),
});

export const solutionCategorySchema = z.object({
  title: z.string().refine((val) => val.length > 0, "Title is required"),
  thumbnail: z.string().refine((url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }, "Thumbnail URL is required"),
  order_by: z.string().refine((val) => val.length > 0, "Order is required"),
});

export const solutionSubCategorySchema = z.object({
  title: z.string().refine((val) => val.length > 0, "Title is required"),
  category_id: z
    .any()
    .refine((val) => val.length > 0, "Category ID is required"),
  subject_ids: z
    .any()
    .refine((val) => val.length > 0, "Subject ID is required"),
  order_by: z.string().refine((val) => val.length > 0, "Order is required"),
});

export const solutionContentSchema = z.object({
  title: z.string().refine((val) => val.length > 0, "Title is required"),
  category_id: z
    .any()
    .refine((val) => val.length > 0, "Category ID is required"),
  sub_category_id: z
    .any()
    .refine((val) => val.length > 0, "Sub Category ID is required"),
  subject_id: z.any().refine((val) => val.length > 0, "Subject ID is required"),
  type: z.any().refine((val) => val.length > 0, "Type is required"),
  content_url: z.string().refine((url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }, "Content URL is required"),
});

export const solutionSubjectSchema = z.object({
  title: z.string().refine((val) => val.length > 0, "Title is required"),
});
