package com.schoolease.service;

import java.util.List;

import com.schoolease.entity.Course;
import com.schoolease.entity.Grade;

public interface CourseService {
	
	Course addCourse(Course course);

	Course updateCourse(Course course);

	Course getCourseById(int courseId);

	List<Course> getAllCoursesByStatus(String status);
	
	List<Course> getAllCoursesByGradeAndStatus(Grade grade, String status);

}
