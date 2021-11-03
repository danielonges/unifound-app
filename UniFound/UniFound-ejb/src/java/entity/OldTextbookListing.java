/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

/**
 *
 * @author jiajun
 */
@Entity
public class OldTextbookListing implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @NotNull
    private String moduleEntity;//the word "module" is a reserved SQL keyword
    private String name;
    private String description;
    
    @ManyToOne(fetch = FetchType.EAGER)
    private UserEntity userEntity;

    public OldTextbookListing() {
    }

    public OldTextbookListing(String moduleEntity, String name, String description) {
        this.moduleEntity = moduleEntity;
        this.name = name;
        this.description = description;
    }
    

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getModuleEntity() {
        return moduleEntity;
    }

    public void setModuleEntity(String moduleEntity) {
        this.moduleEntity = moduleEntity;
    }



    @Override
    public String toString() {
        return "entity.OldTextbookListing[ id=" + id + " ]";
    }

    public UserEntity getUserEntity() {
        return userEntity;
    }

    public void setUserEntity(UserEntity userEntity) {
        this.userEntity = userEntity;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}
