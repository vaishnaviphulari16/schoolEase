package com.schoolease.service;

import java.util.List;

import com.schoolease.entity.Batch;
import com.schoolease.entity.User;

public interface UserService {

	User addUser(User user);
	
	User updateUser(User user);

	User getUserByEmailAndStatus(String emailId, String status);

	User getUserByEmailid(String emailId);

	List<User> getUserByRole(String role);
	
	User getUserById(int userId);
		
	User getUserByEmailIdAndRoleAndStatus(String emailId, String role, String status);
	
	List<User> updateAllUser(List<User> users);
	
	List<User> getUserByRoleAndStatus(String role, String status);
	
	List<User> getUserByRoleAndBatchAndStatus(String role, Batch batch, String status);
		
}
