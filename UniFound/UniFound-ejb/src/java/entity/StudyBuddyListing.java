/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import enumeration.CourseEnum;
import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;


@Entity
public class StudyBuddyListing implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @NotNull
    private String gender;

    @Column(nullable = false)
    @NotNull
    private String module;

    @Column(nullable = false)
    @NotNull
    private CourseEnum course;

    @Column(nullable = false)
    @NotNull
    private String yearOfStudy;

    @Column(nullable = false)
    @NotNull
    private String location;

    @Column(nullable = false)
    @NotNull
    private Integer groupsize;
    
    @ManyToOne(fetch = FetchType.EAGER)
    private UserEntity userEntity;


    public StudyBuddyListing() {
    }

    public StudyBuddyListing(String gender, String module, CourseEnum course, String year, String location, Integer groupsize) {
        this.gender = gender;
        this.module = module;
        this.course = course;
        this.yearOfStudy = year;
        this.location = location;
        this.groupsize = groupsize;
    }
    
    public StringgetGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof StudyBuddyListing)) {
            return false;
        }
        StudyBuddyListing other = (StudyBuddyListing) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.StudyBuddyListing[ id=" + id + " ]";
    }

    public String getModule() {
        return module;
    }

    public void setModule(String module) {
        this.module = module;
    }

    public CourseEnum getCourse() {
        return course;
    }

    public void setCourse(CourseEnum course) {
        this.course = course;
    }

    public String getYearOfStudy() {
        return yearOfStudy;
    }

    public void setYearOfStudy(String yearofStudy) {
        this.yearOfStudy = yearOfStudy;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Integer getGroupsize() {
        return groupsize;
    }

    public void setGroupsize(Integer groupsize) {
        this.groupsize = groupsize;
    }

    public UserEntity getUserEntity() {
        return userEntity;
    }

    public void setUserEntity(UserEntity userEntity) {
        this.userEntity = userEntity;
    }

}
