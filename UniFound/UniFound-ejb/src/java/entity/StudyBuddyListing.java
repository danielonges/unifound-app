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
    private String course;

    @Column(nullable = false)
    @NotNull
    private String yearOfStudy;

    @Column(nullable = false)
    @NotNull
    private String location;

    @Column(nullable = false)
    @NotNull
    private int groupsize;
    
    @ManyToOne(fetch = FetchType.EAGER)
    private UserEntity userEntity;


    public StudyBuddyListing() {
    }

    
    

    public StudyBuddyListing(String gender, String module, String course, String yearOfStudy, String location, int groupsize,UserEntity userEntity) {
        this.gender = gender;
        this.module = module;
        this.course = course;
        this.yearOfStudy = yearOfStudy;
        this.location = location;
        this.groupsize = groupsize;
        this.userEntity = userEntity;
    }
    
    public String getGender() {
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
    
    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
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

  

    public String getYearOfStudy() {
        return yearOfStudy;
    }

    public void setYearOfStudy(String yearofStudy) {
        this.yearOfStudy = yearofStudy;
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
