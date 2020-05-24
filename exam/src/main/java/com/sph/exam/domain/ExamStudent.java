package com.sph.exam.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A ExamStudent.
 */
@Entity
@Table(name = "exam_student")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ExamStudent implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_customer")
    private String idCustomer;

    @ManyToOne
    @JsonIgnoreProperties("examStudents")
    private Exam exam;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIdCustomer() {
        return idCustomer;
    }

    public ExamStudent idCustomer(String idCustomer) {
        this.idCustomer = idCustomer;
        return this;
    }

    public void setIdCustomer(String idCustomer) {
        this.idCustomer = idCustomer;
    }

    public Exam getExam() {
        return exam;
    }

    public ExamStudent exam(Exam exam) {
        this.exam = exam;
        return this;
    }

    public void setExam(Exam exam) {
        this.exam = exam;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ExamStudent examStudent = (ExamStudent) o;
        if (examStudent.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), examStudent.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ExamStudent{" +
            "id=" + getId() +
            ", idCustomer='" + getIdCustomer() + "'" +
            "}";
    }
}
