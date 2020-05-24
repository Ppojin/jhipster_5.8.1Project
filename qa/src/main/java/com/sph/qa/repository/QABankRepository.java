package com.sph.qa.repository;

import com.sph.qa.domain.QABank;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the QABank entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QABankRepository extends JpaRepository<QABank, Long> {

}
