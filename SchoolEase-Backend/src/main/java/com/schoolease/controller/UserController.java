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

import com.fasterxml.jackson.core.JsonProcessingException;
import com.schoolease.dto.CommonApiResponse;
import com.schoolease.dto.RegisterUserRequestDto;
import com.schoolease.dto.UserLoginRequest;
import com.schoolease.dto.UserLoginResponse;
import com.schoolease.dto.UserResponseDto;
import com.schoolease.dto.UserStatusUpdateRequestDto;
import com.schoolease.resource.UserResource;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

	@Autowired
	private UserResource userResource;

	// RegisterUserRequestDto, only email, password & role from UI
	@PostMapping("/admin/register")
	@Operation(summary = "Api to register Admin")
	public ResponseEntity<CommonApiResponse> registerAdmin(@RequestBody RegisterUserRequestDto request) {
		return userResource.registerAdmin(request);
	}

	// for student and teacher register
	@PostMapping("register")
	@Operation(summary = "Api to register user")
	public ResponseEntity<CommonApiResponse> registerUser(@RequestBody RegisterUserRequestDto request) {
		return this.userResource.registerUser(request);
	}

	@PostMapping("login")
	@Operation(summary = "Api to login any User")
	public ResponseEntity<UserLoginResponse> login(@RequestBody UserLoginRequest userLoginRequest) {
		return userResource.login(userLoginRequest);
	}

	@GetMapping("/fetch/role-wise")
	@Operation(summary = "Api to get Users By Role")
	public ResponseEntity<UserResponseDto> fetchAllUsersByRole(@RequestParam("role") String role)
			throws JsonProcessingException {
		return userResource.getUsersByRole(role);
	}

	@PutMapping("update/status")
	@Operation(summary = "Api to update the user status")
	public ResponseEntity<CommonApiResponse> updateUserStatus(@RequestBody UserStatusUpdateRequestDto request) {
		return userResource.updateUserStatus(request);
	}

	@GetMapping("/fetch/user-id")
	@Operation(summary = "Api to get User Detail By User Id")
	public ResponseEntity<UserResponseDto> fetchUserById(@RequestParam("userId") int userId) {
		return userResource.getUserById(userId);
	}
	
	@DeleteMapping("/delete/user-id")
	@Operation(summary = "Api to delete the user by ID")
	public ResponseEntity<CommonApiResponse> deleteUserById(@RequestParam("userId") int userId) {
		return userResource.deleteUserById(userId);
	}
	
	@PutMapping("student/batch/transfer")
	@Operation(summary = "Api to transfer student to another bacth")
	public ResponseEntity<CommonApiResponse> transferStudentToAnotherBatch(@RequestParam("fromBatchId") int fromBatchId, @RequestParam("toBatchId") int toBatchId) {
		return userResource.transferStudentToAnotherBatch(fromBatchId, toBatchId);
	}
	
	@PutMapping("student/batch/deactivate")
	@Operation(summary = "Api to deactivate the student from batch")
	public ResponseEntity<CommonApiResponse> deactivateBatchStudent(@RequestParam("batchId") int batchId) {
		return userResource.deactivateBatchStudent(batchId);
	}

}
