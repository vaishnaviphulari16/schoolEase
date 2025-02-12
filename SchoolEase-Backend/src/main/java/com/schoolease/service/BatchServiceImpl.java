package com.schoolease.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.schoolease.dao.BatchDao;
import com.schoolease.entity.Batch;
import com.schoolease.entity.Grade;

@Service
public class BatchServiceImpl implements BatchService {

	@Autowired
	private BatchDao batchDao;
	
	@Override
	public Batch addBatch(Batch batch) {
		// TODO Auto-generated method stub
		return batchDao.save(batch);
	}

	@Override
	public Batch updateBatch(Batch batch) {
		// TODO Auto-generated method stub
		return batchDao.save(batch);
	}

	@Override
	public Batch getBatchById(int batchId) {
		Optional<Batch> optionalBatch = batchDao.findById(batchId);

		if (optionalBatch.isPresent()) {
			return optionalBatch.get();
		} else {
			return null;
		}
	}

	@Override
	public List<Batch> getAllBatchsByStatus(String status) {
		// TODO Auto-generated method stub
		return batchDao.findByStatus(status);
	}

	@Override
	public List<Batch> getAllBatchsByGradeAndStatus(Grade grade, String status) {
		// TODO Auto-generated method stub
		return batchDao.findByGradeAndStatus(grade, status);
	}

}
