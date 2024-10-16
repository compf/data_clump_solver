package org.apache.dolphinscheduler.dao.mapper;

import org.apache.dolphinscheduler.dao.entity.WorkflowInstance;
import org.apache.ibatis.annotations.Param;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;

import java.util.Date;

public class WorkflowInstanceQuery {
    private Long projectCode;
    private Long workflowDefinitionCode;
    private String searchVal;
    private String executorName;
    private int[] statusArray;
    private String host;
    private Date startTime;
    private Date endTime;

    // getters and setters
}