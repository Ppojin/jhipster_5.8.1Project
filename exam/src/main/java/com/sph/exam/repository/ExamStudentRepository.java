package com.sph.exam.repository;

import com.sph.exam.domain.ExamStudent;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ExamStudent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExamStudentRepository extends JpaRepository<ExamStudent, Long> {

}
