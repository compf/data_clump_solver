package org.apache.dolphinscheduler.dao.mapper;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.dolphinscheduler.dao.entity.WorkflowInstance;

public class WorkflowInstanceQuery {
    private final Page<WorkflowInstance> page;
    private final String name;
    private final Long workflowDefinitionCode;
    private final String host;

    // Constructor, Getters
}