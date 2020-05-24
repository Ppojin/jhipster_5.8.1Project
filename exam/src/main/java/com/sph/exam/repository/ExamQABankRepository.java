package com.sph.exam.repository;

import com.sph.exam.domain.ExamQABank;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ExamQABank entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExamQABankRepository extends JpaRepository<ExamQABank, Long> {

}
