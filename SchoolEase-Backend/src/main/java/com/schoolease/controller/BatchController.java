package com.schoolease.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.schoolease.dto.AddBatchRequest;
import com.schoolease.dto.BatchResponseDto;
import com.schoolease.dto.CommonApiResponse;
import com.schoolease.resource.BatchResource;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("api/batch")
@CrossOrigin(origins = "http://localhost:3000")
public class BatchController {

	@Autowired
	private BatchResource batchResource;

	@PostMapping("/add")
	@Operation(summary = "Api to add batch")
	public ResponseEntity<CommonApiResponse> addBatch(@RequestBody AddBatchRequest request) {
		return batchResource.addBatch(request);
	}

	@PutMapping("/update")
	@Operation(summary = "Api to update batch")
	public ResponseEntity<CommonApiResponse> updateBatch(@RequestBody AddBatchRequest batch) {
		return batchResource.updateBatch(batch);
	}

	@GetMapping("/fetch/all")
	@Operation(summary = "Api to fetch all batch")
	public ResponseEntity<BatchResponseDto> fetchAllBatch() {
		return batchResource.fetchAllBatch();
	}

	@GetMapping("/fetch/all/grade-wise")
	@Operation(summary = "Api to fetch all batch by grades")
	public ResponseEntity<BatchResponseDto> fetchAllBatchbyGrade(@RequestParam("gradeId") int gradeId) {
		return batchResource.fetchAllBatchByGrade(gradeId);
	}
	
	@GetMapping("/fetch/id")
	@Operation(summary = "Api to fetch all batch by grades")
	public ResponseEntity<BatchResponseDto> fetchBatchById(@RequestParam("batchId") int batchId) {
		return batchResource.fetchBatchById(batchId);
	}

	@DeleteMapping("/delete")
	@Operation(summary = "Api to delete batch")
	public ResponseEntity<CommonApiResponse> deleteBatch(@RequestParam("batchId") int batchId) {
		return batchResource.deleteBatch(batchId);
	}
	
}
