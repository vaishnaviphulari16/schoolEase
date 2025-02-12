package com.schoolease.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.schoolease.entity.Course;
import com.schoolease.entity.Grade;

@Repository
public interface CourseDao extends JpaRepository<Course, Integer> {
	
	List<Course> findByGradeAndStatus(Grade grade, String status);
	
	List<Course> findByStatus(String status);											

}
