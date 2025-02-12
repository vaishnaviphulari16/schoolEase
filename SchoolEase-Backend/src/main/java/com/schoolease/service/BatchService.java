package com.schoolease.service;

import java.util.List;

import com.schoolease.entity.Batch;
import com.schoolease.entity.Grade;

public interface BatchService {
	
	Batch addBatch(Batch batch);

	Batch updateBatch(Batch batch);

	Batch getBatchById(int batchId);

	List<Batch> getAllBatchsByStatus(String status);
	
	List<Batch> getAllBatchsByGradeAndStatus(Grade grade, String status);

}
