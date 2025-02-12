package com.schoolease.dto;

import java.util.List;

import com.schoolease.entity.Batch;
import com.schoolease.entity.Course;
import com.schoolease.entity.Grade;

public class GradeBatch {

	private Grade grade;

	private List<Batch> batches;

	private List<Course> courses;

	public Grade getGrade() {
		return grade;
	}

	public void setGrade(Grade grade) {
		this.grade = grade;
	}

	public List<Batch> getBatches() {
		return batches;
	}

	public void setBatches(List<Batch> batches) {
		this.batches = batches;
	}

	public List<Course> getCourses() {
		return courses;
	}

	public void setCourses(List<Course> courses) {
		this.courses = courses;
	}

}
