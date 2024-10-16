package org.apache.dolphinscheduler.dao.mapper;

import org.apache.dolphinscheduler.dao.entity.WorkflowInstance;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;

public class InstanceQueryV2PagingData {

    private Page<WorkflowInstance> page;
    private long workflowDefinitionCode;
    private String name;
    private String host;

    // Constructor, getters, and additional methods for functionality
}