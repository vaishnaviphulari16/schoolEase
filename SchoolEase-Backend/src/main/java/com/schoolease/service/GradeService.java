package com.schoolease.service;

import java.util.List;

import com.schoolease.entity.Grade;

public interface GradeService {

	Grade addGrade(Grade grade);

	Grade updateGrade(Grade grade);

	Grade getGradeById(int gradeId);

	List<Grade> getAllGradesByStatus(String status);

}
