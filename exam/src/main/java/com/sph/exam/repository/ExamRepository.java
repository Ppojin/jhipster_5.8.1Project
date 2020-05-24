package com.sph.exam.repository;

import com.sph.exam.domain.Exam;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Exam entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExamRepository extends JpaRepository<Exam, Long> {

    @Query(value = "select distinct exam from Exam exam left join fetch exam.examQABanks",
        countQuery = "select count(distinct exam) from Exam exam")
    Page<Exam> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct exam from Exam exam left join fetch exam.examQABanks")
    List<Exam> findAllWithEagerRelationships();

    @Query("select exam from Exam exam left join fetch exam.examQABanks where exam.id =:id")
    Optional<Exam> findOneWithEagerRelationships(@Param("id") Long id);

}
