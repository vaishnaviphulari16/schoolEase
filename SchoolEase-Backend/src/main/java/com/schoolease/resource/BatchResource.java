package com.schoolease.resource;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import com.schoolease.dto.AddBatchRequest;
import com.schoolease.dto.BatchResponseDto;
import com.schoolease.dto.CommonApiResponse;
import com.schoolease.entity.Batch;
import com.schoolease.entity.Grade;
import com.schoolease.exception.BatchSaveFailedException;
import com.schoolease.exception.GradeSaveFailedException;
import com.schoolease.service.BatchService;
import com.schoolease.service.GradeService;
import com.schoolease.utility.Constants.ActiveStatus;

import jakarta.transaction.Transactional;

@Component
@Transactional
public class BatchResource {

	private final Logger LOG = LoggerFactory.getLogger(BatchResource.class);

	@Autowired
	private BatchService batchService;

	@Autowired
	private GradeService gradeService;

	public ResponseEntity<CommonApiResponse> addBatch(AddBatchRequest request) {

		LOG.info("Request received for add batch");

		CommonApiResponse response = new CommonApiResponse();

		if (request == null || !AddBatchRequest.validate(request)) {
			response.setResponseMessage("missing input");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		Grade grade = this.gradeService.getGradeById(request.getGradeId());

		if (grade == null) {
			response.setResponseMessage("grade not found");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		Batch batch = new Batch();
		batch.setName(request.getName());
		batch.setDescription(request.getDescription());
		batch.setGrade(grade);
		batch.setStatus(ActiveStatus.ACTIVE.value());

		Batch savedBatch = this.batchService.addBatch(batch);

		if (savedBatch == null) {
			throw new BatchSaveFailedException("Failed to add batch");
		}

		response.setResponseMessage("Batch Added Successful");
		response.setSuccess(true);

		return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);

	}

	public ResponseEntity<CommonApiResponse> updateBatch(AddBatchRequest batch) {

		LOG.info("Request received for add batch");

		CommonApiResponse response = new CommonApiResponse();

		if (batch == null) {
			response.setResponseMessage("missing input");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		if (batch.getId() == 0 || batch.getName() == null || batch.getDescription() == null
				|| batch.getGradeId() == 0) {
			response.setResponseMessage("missing input");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		Grade grade = this.gradeService.getGradeById(batch.getGradeId());

		if (grade == null) {
			response.setResponseMessage("grade not found");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		Batch existingBatch = this.batchService.getBatchById(batch.getId());
		existingBatch.setName(batch.getName());
		existingBatch.setDescription(batch.getDescription());
		existingBatch.setGrade(grade);
		existingBatch.setStatus(ActiveStatus.ACTIVE.value());
		Batch savedBatch = this.batchService.updateBatch(existingBatch);

		if (savedBatch == null) {
			throw new BatchSaveFailedException("Failed to update batch");
		}

		response.setResponseMessage("Batch Updated Successful");
		response.setSuccess(true);

		return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);

	}

	public ResponseEntity<BatchResponseDto> fetchAllBatch() {

	    LOG.info("Request received for fetching all batches");

	    BatchResponseDto response = new BatchResponseDto();

	    List<Batch> batches = this.batchService.getAllBatchsByStatus(ActiveStatus.ACTIVE.value());

	    if (CollectionUtils.isEmpty(batches)) {
	        response.setResponseMessage("No Batch found");
	        response.setSuccess(false);
	        return new ResponseEntity<>(response, HttpStatus.OK);
	    }

	    response.setBatchs(batches); 
	    response.setResponseMessage("Batches fetched successfully");
	    response.setSuccess(true);

	    return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	
//	public ResponseEntity<BatchResponseDto> fetchAllBatchByGrade(int gradeId) {
//
//		LOG.info("Request received for fetching all batch by Grade");
//
//		BatchResponseDto response = new BatchResponseDto();
//
//		List<Batch> batchs = new ArrayList<>();
//
//		Grade grade = this.gradeService.getGradeById(gradeId);
//
//		if (grade == null) {
//			response.setResponseMessage("grade not found");
//			response.setSuccess(false);
//
//			return new ResponseEntity<BatchResponseDto>(response, HttpStatus.INTERNAL_SERVER_ERROR);
//		}
//
//		batchs = this.batchService.getAllBatchsByGradeAndStatus(grade, ActiveStatus.ACTIVE.value());
//
//		if (CollectionUtils.isEmpty(batchs)) {
//			response.setResponseMessage("No Batch found");
//			response.setSuccess(false);
//
//			return new ResponseEntity<BatchResponseDto>(response, HttpStatus.OK);
//		}
//		return new ResponseEntity<BatchResponseDto>(response, HttpStatus.OK);
//	}
	
	
	public ResponseEntity<BatchResponseDto> fetchAllBatchByGrade(int gradeId) {

	    LOG.info("Request received for fetching all batches by Grade");

	    BatchResponseDto response = new BatchResponseDto();

	    Grade grade = this.gradeService.getGradeById(gradeId);

	    if (grade == null) {
	        response.setResponseMessage("Grade not found");
	        response.setSuccess(false);
	        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
	    }

	    List<Batch> batches = this.batchService.getAllBatchsByGradeAndStatus(grade, ActiveStatus.ACTIVE.value());

	    if (CollectionUtils.isEmpty(batches)) {
	        response.setResponseMessage("No Batch found");
	        response.setSuccess(false);
	        return new ResponseEntity<>(response, HttpStatus.OK);
	    }

	    response.setBatchs(batches); // Corrected: Setting the batch list in response
	    response.setResponseMessage("Batches fetched successfully");
	    response.setSuccess(true);

	    return new ResponseEntity<>(response, HttpStatus.OK);
	}

	public ResponseEntity<CommonApiResponse> deleteBatch(int batchId) {

		LOG.info("Request received for deleting grade");

		CommonApiResponse response = new CommonApiResponse();

		if (batchId == 0) {
			response.setResponseMessage("missing batch Id");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		Batch batch = this.batchService.getBatchById(batchId);

		if (batch == null) {
			response.setResponseMessage("batch not found");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		batch.setStatus(ActiveStatus.DEACTIVATED.value());
		Batch updatedBatch = this.batchService.updateBatch(batch);

		if (updatedBatch == null) {
			throw new GradeSaveFailedException("Failed to delete the Batch");
		}

		response.setResponseMessage("Batch Deleted Successful");
		response.setSuccess(true);

		return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);

	}

	public ResponseEntity<BatchResponseDto> fetchBatchById(int batchId) {

		LOG.info("Request received for fetch batch by batch id");

		BatchResponseDto response = new BatchResponseDto();

		if (batchId == 0) {
			response.setResponseMessage("missing batch Id");
			response.setSuccess(false);

			return new ResponseEntity<BatchResponseDto>(response, HttpStatus.BAD_REQUEST);
		}

		Batch batch = this.batchService.getBatchById(batchId);

		if (batch == null) {
			response.setResponseMessage("batch not found");
			response.setSuccess(false);

			return new ResponseEntity<BatchResponseDto>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<BatchResponseDto>(response, HttpStatus.OK);
	}

}
