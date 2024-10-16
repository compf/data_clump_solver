package org.apache.dolphinscheduler.dao.entity;

import org.apache.dolphinscheduler.common.enums.AlertStatus;
import org.apache.dolphinscheduler.common.enums.AlertType;
import org.apache.dolphinscheduler.common.enums.WarningType;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@TableName("t_ds_alert")
public class Alert {

    @TableId(value = "id", type = IdType.AUTO)
    private int id;

    @TableField(value = "title")
    private String title;

    @TableField(value = "content")
    private String content;

    @TableField(value = "alert_status")
    private AlertStatus alertStatus;

    @TableField(value = "warning_type")
    private WarningType warningType;

    @TableField(value = "log")
    private String log;

    @TableField(value = "alert_type")
    private AlertType alertType;

    @TableField(value = "create_time")
    private Date createTime;

    @TableField(value = "workflow_instance_id")
    private Integer workflowInstanceId;

    @TableField(value = "info")
    private String info;

    // Other fields, getters, setters, and methods omitted for brevity
}
